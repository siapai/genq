"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import dynamic from 'next/dynamic';
import  { IpynbRenderer } from 'react-ipynb-renderer'
import  data from "./Model_Training_50_Epoch.json"
import "react-ipynb-renderer/dist/styles/solarizedl.css";

const Page = () => {
  return (
    <>
      <MaxWidthWrapper className="mb-8 mt-24 max-w-5xl">
        <div className="mx-auto mb-10 sm:max-w-lg">
          <p className="mt-5 text-red-800 sm:text-lg">
            *Karena hasilnya overtrain, maka training ke-2 akan diabaikan dalam model deployment
          </p>
        </div>
        <IpynbRenderer
          ipynb={data}
        />
      </MaxWidthWrapper>

    </>
  )
}
export default Page
