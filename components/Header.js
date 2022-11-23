import Image from "next/image";
import React from "react";

const Header = ({ address }) => {
  return (
    <div>
      <header className="flex h-32 text-[#e9f4f1] border-b-[#2d2d2d] items-center p-5 mb-5 fixed top-0 bg-[#211f24]">
        <div className="font-bold text-2xl flex items-center flex-1 gap-5">
          <Image
            className="logo"
            alt="logo"
            height={80}
            width={80}
            src={
              "https://cdn.stamp.fyi/space/apecoin.eth?s=160&cb=ec19915e02892e80"
            }
          />
          <div className="text-5xl">DAO</div>
        </div>
      </header>

      <div className="text-xl mt-24 px-4 py-2 bg-[#2d2d2d] border-2 rounded-full border-emerald-400 fixed">
        {(address).slice(0,8)}...{(address).slice(-7,address.length)}
      </div>
    </div>
  );
};

export default Header;
