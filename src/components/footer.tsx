"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useState, FormEvent } from "react";


export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
      </div>
    </footer>
  );
}
