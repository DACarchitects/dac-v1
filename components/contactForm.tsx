"use client";

import type React from "react";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        e.target as HTMLFormElement
      );

      console.log("Email sent successfully:", result.text);
      (e.target as HTMLFormElement).reset();
      alert("Thank you for your message! We will get back to you soon.");
    } catch (error) {
      console.error("Email sending failed:", error);
      alert(
        "Sorry, there was an error sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg bg-accent border p-8 shadow-sm lg:p-10">
      <div className="mb-8">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-card-foreground">
          {"Send us a message"}
        </h2>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          {"Fill out the form below and we'll get back to you within 24 hours."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">{"First name"}</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="John"
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">{"Last name"}</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              required
              className="bg-background"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{"Email"}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            required
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{"Phone number"}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            className="bg-background"
          />
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="interest">{"I'm interested in"}</Label>
          <Select name="interest">
            <SelectTrigger id="interest" className="bg-background">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buying">{"Buying a property"}</SelectItem>
              <SelectItem value="selling">{"Selling a property"}</SelectItem>
              <SelectItem value="renting">{"Renting a property"}</SelectItem>
              <SelectItem value="investment">
                {"Investment opportunities"}
              </SelectItem>
              <SelectItem value="consultation">
                {"General consultation"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div> */}

        <div className="space-y-2">
          <Label htmlFor="message">{"Message"}</Label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us more about what you're looking for..."
            rows={5}
            required
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="hover:bg-primary/80"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
