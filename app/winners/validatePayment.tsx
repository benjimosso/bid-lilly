"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export default function ValidatePayment({ handlePayment, WinnerId }: { handlePayment: any, WinnerId: number }) {
  return <Button onClick={() => handlePayment(WinnerId)}>Validate Payment</Button>;
}
