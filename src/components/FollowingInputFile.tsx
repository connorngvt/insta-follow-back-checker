import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef } from "react";
import type { FollowingData } from "@/types";

type FollowingInputFileProps = {
  label: string;
  setData: (data: FollowingData) => void;
};

const FollowingInputFile: React.FC<FollowingInputFileProps> = ({ label, setData }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".json")) {
      alert("Please select a JSON file.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        console.log(json);
        setData(json as FollowingData);
      } catch {
        alert("Invalid JSON file.");
        if (inputRef.current) inputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="grid w-full max-w-md items-center gap-3 text-white">
      <Label htmlFor="following-file" className="text-lg">
        {label}
      </Label>
      <Input
        id="following-file"
        ref={inputRef}
        type="file"
        className="h-10 file:text-md file:mr-4"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default FollowingInputFile;
