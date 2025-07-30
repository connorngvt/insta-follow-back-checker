import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef } from "react";
import type { FollowerData } from "@/types";
import { FaUpload } from "react-icons/fa";

type FollowerInputFileProps = {
  label: string;
  setData: (data: FollowerData[]) => void;
};

const FollowerInputFile: React.FC<FollowerInputFileProps> = ({
  label,
  setData,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidFollowerDataArray = (data: any): data is FollowerData[] => {
    return (
      Array.isArray(data) &&
      data.every(
        (item) =>
          typeof item.title === "string" &&
          Array.isArray(item.media_list_data) &&
          Array.isArray(item.string_list_data) &&
          item.string_list_data.every(
            (s: any) =>
              typeof s.href === "string" &&
              typeof s.value === "string" &&
              typeof s.timestamp === "number"
          )
      )
    );
  }

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
        if (isValidFollowerDataArray(json)) {
          setData(json as FollowerData[]); 
        } else {
          throw new Error("STRUCTURE_INVALID");
        }
      } catch (error: any) {
        if (error.message === "STRUCTURE_INVALID") {
          alert("The JSON file structure is incorrect. Please upload your followers JSON file.")
        } else {
          alert("The selected file is not a valid JSON.");
        }
        if (inputRef.current) inputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="grid w-full max-w-md items-center gap-3">
      <Label htmlFor="follower-file" className="md:text-lg text-black">
        <FaUpload />
        <p>{label}</p>
      </Label>
      <Input
        id="follower-file"
        ref={inputRef}
        type="file"
        className="h-10 text-gray-600 file:text-md file:mr-4 file:cursor-pointer cursor-pointer border-emerald-500 bg-emerald-50 hover:bg-emerald-100 file:text-emerald-500 file:text-xs text-xs md:text-[1rem] md:file:text-[1rem] border-2 transition-colors duration-300 ease-in-out"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default FollowerInputFile;
