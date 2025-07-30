import React, { useState } from "react";
import FollowerInputFile from "@/components/FollowerInputFile";
import FollowingInputFile from "@/components/FollowingInputFile";
import { Button } from "@/components/ui/button";
import type { FollowerData, FollowingData } from "@/types";

const HomePage = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const [followersJson, setFollowersJson] = useState<FollowerData[]>([]);
  const [followingJson, setFollowingJson] = useState<FollowingData>({
    relationships_following: [],
  });

  return (
    <div {...props}>
      <h1 className="text-white text-center font-bold text-5xl pt-20">
        Instagram Follow Back Checker
      </h1>
      <div className="flex gap-10 pt-20">
        <FollowerInputFile
          label="Upload Followers File (.json)"
          setData={setFollowersJson}
        />
        <FollowingInputFile
          label="Upload Following File (.json)"
          setData={setFollowingJson}
        />
      </div>
      <Button className="mt-12 w-xs text-lg cursor-pointer">Compare</Button>
    </div>
  );
};

export default HomePage;
