import React, { useState } from "react";
import FollowerInputFile from "@/components/FollowerInputFile";
import FollowingInputFile from "@/components/FollowingInputFile";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import type { AccountData, FollowerData, FollowingData } from "@/types";

const HomePage = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const [followersJson, setFollowersJson] = useState<FollowerData[]>([]);
  const [followingJson, setFollowingJson] = useState<FollowingData>({
    relationships_following: [],
  });
  const [notFollowingBackList, setNotFollowingBackList] = useState<string[]>(
    []
  );

  const handleSubmit = () => {
    if (
      followersJson.length === 0 ||
      followingJson.relationships_following.length === 0
    ) {
      alert(
        "Please upload both your followers and following JSON files before submitting."
      );
      return;
    }
    const followerUsernames = extractUsernamesFromAccounts(followersJson);
    const followingUsernames = extractUsernamesFromAccounts(
      followingJson.relationships_following
    );
    const notFollowingBackUsernames = followingUsernames.filter(
      (username) => !followerUsernames.includes(username)
    );
    console.log(notFollowingBackUsernames);
    setNotFollowingBackList(notFollowingBackUsernames);
  };

  const extractUsernamesFromAccounts = (accounts: AccountData[]): string[] => {
    let usernames: string[] = [];
    accounts.forEach((account) => {
      usernames.push(account.string_list_data[0].value);
    });
    return usernames;
  };

  return (
    <div {...props}>
      <motion.div
        className="flex flex-col items-center"
        layout
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <motion.h1
          className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-center font-bold text-4xl p-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
        >
          Instagram Follow Back Checker
        </motion.h1>
        <motion.p
          className="text-gray-500 font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
        >
          Check who's not following you back
        </motion.p>
        <motion.div
          className="flex gap-10 pt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: "easeInOut" }}
        >
          <FollowerInputFile
            label="Upload Followers File (.json)"
            setData={setFollowersJson}
          />
          <FollowingInputFile
            label="Upload Following File (.json)"
            setData={setFollowingJson}
          />
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, type: "spring", stiffness: 100, damping: 10 }}
        >
          <Button
            className="mt-12 w-xs md:text-lg cursor-pointer bg-blue-600 hover:bg-blue-500 transition-colors duration-300 ease-in-out shadow-md"
            onClick={handleSubmit}
          >
            Get Results
          </Button>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {notFollowingBackList.length > 0 && (
          <motion.div
            className="mt-10 mx-auto w-full md:w-1/2 flex-1 flex flex-col overflow-hidden p-2"
            key="results"
            initial={{ opacity: 0, y: 60}}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: 60}}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
          >
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-center text-black">
              Not Following You Back ({notFollowingBackList.length})
            </h2>
            <ul className="bg-white rounded-xl overflow-y-auto p-4 space-y-2 flex-1 scrollbar-hide shadow-md border-gray-100 border-1">
              {notFollowingBackList.map((username, idx) => (
                <li
                  key={idx}
                  className=" text-sm md:text-md bg-white border-gray-200 border-2 rounded-md px-4 py-2 hover:bg-blue-50 hover:border-blue-600 transition text-black font-semibold"
                >
                  @{username}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
