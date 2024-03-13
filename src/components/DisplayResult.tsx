"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {InferenceResponse} from "@/components/UploadButton";
import Image from "next/image";
interface Props {
  data: InferenceResponse
}
const DisplayResult: React.FC<Props> = ({ data }) => {
  const staticUrl = 'http://localhost:5501/static/'
  return (

      <Card className="w-full bg-green-50/10 border-2 border-green-100">
        <CardHeader>
          <CardTitle>{data.name.split('.')[0]}</CardTitle>


        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <img src={`${staticUrl}${data.name}`} alt={data.name}
                 className="w-48 h-48 mb-3 rounded-s-sm shadow-lg"/>

          </div>
          <div>
            <h5 className="mt-1.5 text-xl font-medium text-gray-900 dark:text-white">Jenis Kelamin</h5>
            <span className="text-md text-gray-500 dark:text-gray-400">{data.result}</span>
          </div>
          <div>
            <h5 className="mt-1.5 text-xl font-medium text-gray-900 dark:text-white">Akurasi</h5>
            <span className="text-md text-gray-500 dark:text-gray-400">{data.score}</span>
          </div>
          <div>
            <h5 className="mt-1.5 text-xl font-medium text-gray-900 dark:text-white">Waktu Berpikir</h5>
            <span className="text-md text-gray-500 dark:text-gray-400">{data.time}s</span>
          </div>
        </CardContent>
        <CardFooter>

        </CardFooter>
      </Card>




)
}

export default DisplayResult
