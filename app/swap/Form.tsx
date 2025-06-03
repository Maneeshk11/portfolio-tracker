import { getTokenSwapQuote } from "@/api/token/getTokenSwapQuote";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePortfolioStore } from "@/lib/providers/portfolio-store-provider";
import { ArrowDownUp, Wallet } from "lucide-react";
import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { formatUnits } from "viem";
import { z } from "zod";

export type SwapAsset = {
  address: string;
  amount?: number;
  symbol: string;
  image?: string;
  decimals?: number;
  name?: string;
  swapValue?: number;
};

export const swapFormSchema = z.object({
  sendAsset: z.object({
    address: z.string(),
    amount: z.number(),
    swapValue: z.number().optional(),
    decimals: z.number(),
    symbol: z.string(),
    image: z.string(),
  }),
  receiveAsset: z.object({
    address: z.string(),
    swapValue: z.number().optional(),
    amount: z.number(),
    decimals: z.number(),
    symbol: z.string(),
    image: z.string(),
  }),
});

const SwapForm = () => {
  const form = useForm<z.infer<typeof swapFormSchema>>({
    defaultValues: {
      sendAsset: {
        address: "",
        amount: 0,
        swapValue: undefined,
        decimals: 0,
        symbol: "",
        image: "",
      },
      receiveAsset: {
        address: "",
        swapValue: undefined,
        amount: 0,
        decimals: 0,
        symbol: "",
        image: "",
      },
    },
  });
  const { assets } = usePortfolioStore((state) => state);

  const [validSwap, setValidSwap] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = async (data: z.infer<typeof swapFormSchema>) => {
    console.log(data);
  };

  const handleChange = async (data: z.infer<typeof swapFormSchema>) => {
    if (
      Number(data.sendAsset.swapValue) > (data.sendAsset?.amount ?? 0) ||
      Number(data.sendAsset.swapValue) < 0 ||
      data.receiveAsset.address === "" ||
      data.sendAsset.address === ""
    ) {
      console.log("invalid swap", data.sendAsset.swapValue);
      setValidSwap(false);
      return;
    }

    try {
      const d = await getTokenSwapQuote(
        data.sendAsset as SwapAsset,
        data.receiveAsset as SwapAsset
      );

      // Check if we have valid response data before updating the form
      if (d && d.dstAmount && data.receiveAsset.decimals !== undefined) {
        form.setValue("receiveAsset", {
          ...form.getValues("receiveAsset"),
          swapValue: Number(
            formatUnits(d.dstAmount, data.receiveAsset.decimals)
          ),
        });
        setValidSwap(true);
      } else {
        console.log("Invalid response or missing data:", d);
        // Optionally clear the receive amount if no valid data
        form.setValue("receiveAsset", {
          ...form.getValues("receiveAsset"),
          swapValue: 0,
        });
        setValidSwap(false);
      }
    } catch (error) {
      console.error("Error getting swap quote:", error);
      // Clear the receive amount on error
      form.setValue("receiveAsset", {
        ...form.getValues("receiveAsset"),
        swapValue: 0,
      });
      setValidSwap(false);
    }
  };

  const debouncedHandleChange = useCallback(
    (data: z.infer<typeof swapFormSchema>) => {
      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new timer
      debounceTimerRef.current = setTimeout(() => {
        handleChange(data);
      }, 500); // 500ms delay
    },
    []
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 items-center w-full"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col gap-4 items-center w-full relative">
          <div className="flex items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border rounded-full p-2 z-[100]">
            <ArrowDownUp className="w-5 h-5 " />
          </div>
          <div className="flex flex-col gap-2 border rounded p-4 shadow-2xl shadow-primary/50 dark:shadow-primary/50 w-full relative z-10">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Send</span>

              <span className="text-sm font-medium flex items-center gap-2 text-gray-500">
                <Wallet className="w-4 h-4" />
                {form.watch("sendAsset").amount}
              </span>
            </div>
            <FormField
              control={form.control}
              name="sendAsset"
              render={({ field }) => (
                <div className="flex justify-between items-center w-full">
                  <FormItem>
                    <FormControl>
                      <Input
                        className={`${
                          !validSwap ? "text-primary" : "text-gray-500"
                        } shadow-none border-none bg-none focus-visible:ring-0 dark:bg-transparent p-0 text-xl dark:text-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                        placeholder="0"
                        type="number"
                        value={field.value.swapValue ?? ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;

                          // Handle empty string - don't convert to 0
                          if (inputValue === "") {
                            field.onChange({
                              ...field.value,
                              swapValue: undefined,
                            });

                            // Clear receive input when send input is empty
                            form.setValue("receiveAsset", {
                              ...form.getValues("receiveAsset"),
                              swapValue: undefined,
                            });
                            setValidSwap(false);
                            return;
                          }

                          const newValue = Number(inputValue);
                          field.onChange({
                            ...field.value,
                            swapValue: newValue,
                          });

                          // Also handle the case when value is 0
                          if (newValue === 0) {
                            form.setValue("receiveAsset", {
                              ...form.getValues("receiveAsset"),
                              swapValue: 0,
                            });
                            setValidSwap(false);
                            return;
                          }

                          // Reset validSwap to false when user starts typing, will be set to true by API response
                          setValidSwap(false);

                          // Only debounce if we have a valid value and both assets are selected
                          if (
                            newValue > 0 &&
                            field.value.address &&
                            form.getValues("receiveAsset").address
                          ) {
                            debouncedHandleChange({
                              sendAsset: {
                                ...field.value,
                                swapValue: newValue,
                              },
                              receiveAsset: form.getValues("receiveAsset"),
                            });
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormControl>
                      <Select
                        value={field.value.address}
                        onValueChange={(value) => {
                          const asset = assets.find(
                            (asset) => asset.address === value
                          );
                          field.onChange({
                            ...field.value,
                            address: value,
                            amount: Number(asset?.amount),
                            decimals: Number(asset?.decimals),
                            symbol: asset?.symbol ?? "",
                            image: asset?.image ?? "",
                          });

                          // Reset validSwap when asset changes
                          setValidSwap(false);
                        }}
                      >
                        <SelectTrigger className="w-40 bg-transparent dark:bg-transparent rounded-full">
                          <SelectValue placeholder="Select a token" />
                        </SelectTrigger>
                        <SelectContent>
                          {assets.map((asset) => (
                            <SelectItem
                              key={asset.address}
                              value={asset.address}
                              className="flex items-center gap-2"
                            >
                              {asset.image && (
                                <Image
                                  src={asset.image ?? ""}
                                  alt={asset.symbol ?? ""}
                                  width={20}
                                  height={20}
                                />
                              )}
                              <span>{asset.symbol}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                </div>
              )}
            />
          </div>

          <div className="flex flex-col gap-2 border rounded p-4  shadow-2xl shadow-primary/50 dark:shadow-primary/50 w-full relative z-10">
            <span className="text-sm font-medium">Receive</span>
            <FormField
              control={form.control}
              name="receiveAsset"
              render={({ field }) => (
                <div className="flex justify-between items-center w-full">
                  <FormItem>
                    <FormControl>
                      <Input
                        className="shadow-none border-none bg-none focus-visible:ring-0 dark:bg-transparent p-0 text-xl dark:text-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="0"
                        type="number"
                        value={field.value.swapValue ?? ""}
                        onChange={(e) => {
                          const inputValue = e.target.value;

                          // Handle empty string - don't convert to 0
                          if (inputValue === "") {
                            field.onChange({
                              ...field.value,
                              swapValue: undefined,
                            });
                            setValidSwap(false);
                            return;
                          }

                          field.onChange({
                            ...field.value,
                            swapValue: Number(inputValue),
                          });

                          // Reset validSwap when receive input is manually changed
                          setValidSwap(false);
                        }}
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormControl>
                      <Select
                        value={field.value.address}
                        onValueChange={(value) => {
                          const asset = assets.find(
                            (asset) => asset.address === value
                          );
                          field.onChange({
                            ...field.value,
                            address: value,
                            amount: Number(asset?.amount),
                            decimals: Number(asset?.decimals),
                            symbol: asset?.symbol ?? "",
                            image: asset?.image ?? "",
                          });

                          // Reset validSwap when asset changes
                          setValidSwap(false);
                        }}
                      >
                        <SelectTrigger className="w-40 bg-transparent dark:bg-transparent rounded-full">
                          <SelectValue placeholder="Select a token" />
                        </SelectTrigger>
                        <SelectContent>
                          {assets.map((asset) => (
                            <SelectItem
                              key={asset.address}
                              value={asset.address}
                              className="flex items-center gap-2"
                            >
                              {asset.image && (
                                <Image
                                  src={asset.image ?? ""}
                                  alt={asset.symbol ?? ""}
                                  width={20}
                                  height={20}
                                />
                              )}
                              <span className="font-medium">
                                {asset.symbol}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                </div>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-24  cursor-pointer"
          disabled={!validSwap}
        >
          Swap
        </Button>
      </form>
    </Form>
  );
};

export default SwapForm;
