"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import Select from "@repo/ui/select";
import { TextInput } from "@repo/ui/textInput";
import React, { useState } from "react";
import { createOnRampTransaction } from "../lib/actions/createOnRampTransaction";

const SUPPORTED_BANKS = [
  {
    name: "Allied Bank limited",
    redirectUrl: "https://www.abl.com/",
  },
  {
    name: "Habib Bank limited",
    redirectUrl: "https://www.hbl.com/",
  },
];
export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [value, setValue] = useState<number>(0);
  const [provider, setProvider] = useState<string>(
    SUPPORTED_BANKS[0]?.name || ""
  );
  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label="Amount"
          placeholder="amount"
          onChange={(val) => setValue(Number(val))}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            // FIND SELECTED BANK AND SET THE REDIRECT URL TO THE BANK URL
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              await createOnRampTransaction(provider, value);
              window.location.href = redirectUrl || "";
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
