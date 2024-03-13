"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import dynamic from 'next/dynamic';
import  { IpynbRenderer } from 'react-ipynb-renderer'
import  data from "./Model_Training.json"
import "react-ipynb-renderer/dist/styles/solarizedl.css";

const Page = () => {
  return (
    <>
      <MaxWidthWrapper className="mb-8 mt-24 max-w-5xl">
        <div className="mx-auto mb-10 sm:max-w-lg">
          <p className="mt-5 text-gray-600 sm:text-lg">
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
