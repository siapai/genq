"use client"
import React, {useState} from "react";
import Dropzone from 'react-dropzone'
import {Cloud, File, Loader2} from "lucide-react";
import {Progress} from "@/components/ui/progress";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import axios from 'axios'
import {API_URL} from "@/app.config";

interface Props {
    isSubscribed?: boolean,
    onResult: (data: InferenceResponse[]) => void,
    onErrorResult: () => void,
}

interface FileResponse {
  file: string
  content: string
  path: string
}

export interface InferenceResponse {
  name: string
  result: string
  score: string
  time: number
}
const UploadDropzone: React.FC<Props> = ({ isSubscribed = false, onResult, onErrorResult }) => {
    const router = useRouter()
    const [isUploading, setIsUploading] = useState(true)
    const[uploadProgress, setUploadProgress] = useState(0)
    const[isThinking, setIsThinking] = useState(false)

    const { toast } = useToast()

    // const {mutate: startPolling} = trpc.getFile.useMutation({
    //     onSuccess: (file) => {
    //         router.push(`/dashboard/${file.id}`)
    //     },
    //     retry: true,
    //     retryDelay: 500
    // })

  const startUpload =  async (files: File[]): Promise<FileResponse | null> => {
      console.log("FILES", files)
      const formData = new FormData();
      formData.append("uploaded_file", files[0])
    try {
      const res = await axios
        .post(`http://localhost:5501/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

      return {
        file: res.data.file,
        content: res.data.content,
        path: res.data.path
      }

    } catch (e) {

    }

    return null
  }

  const startInference = async (filename: string): Promise<InferenceResponse[]> => {
      const body = {
        filename
      }
      try {
        const res = await axios
          .post(`http://localhost:5501/predict/crop`, body, {
            headers: {
              "Content-Type": "application/json",
            },
          })

        return res.data

      } catch (e) {

      }
      return  []
  }

    const startSimulatedProgress = () => {
        setUploadProgress(0)
        const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if(prevProgress >= 95) {
                    clearInterval(interval)
                    return prevProgress
                }
                return prevProgress +5
            })
        }, 500)

        return interval
    }


    return (
        <Dropzone multiple={false} onDrop={ async acceptedFiles =>  {
          setIsUploading(true)
          const progressInterval = startSimulatedProgress()

          // handle file upload
          const res = await startUpload(acceptedFiles)

          if(!res) {
              return toast({
                  title: 'Error',
                  description: 'Terjadi kesalahan',
                  variant: 'destructive'
              })
          }

          const { file} = res
          if(file) {
            toast({
                title: file,
                description: 'Foto berhasil diunggah',
                variant: 'default'
            })
          }

          clearInterval(progressInterval)
          setUploadProgress(100)

          setIsThinking(true)
          const predictions = await startInference(file)
          setIsThinking(false)

          if(predictions.length < 1) {
            onErrorResult()
            return toast({
              title: 'Kesalahan Gambar',
              description: 'Tidak ditemukan wajah di dalam gambar!',
              variant: 'destructive'
            })
          }

          onResult(predictions)




          // const [fileResponse] = res
            //
            // const key = fileResponse?.key
            //
            // if(!key) {
            //     return toast({
            //         title: '出了點問題',
            //         description: '請稍後再試',
            //         variant: 'destructive'
            //     })
            // }





            // startPolling({ key })
        }}>
            {({ getRootProps, getInputProps, acceptedFiles}) => (
                <div {...getRootProps()} className="border h-64 m-4 border-dashed border-emerald-300 rounded-lg w-9/12">
                    <div className="flex items-center justify-center h-full w-full">
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-emerald-50 hover:bg-emerald-100"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                                <p className="mb-2 text-sm text-zinc-700">
                                    <span className="font-semibold">
                                        Drop
                                    </span>{' '}
                                    atau klik
                                </p>
                                <p className="text-xs text-zinc-500">Gambar (max {isSubscribed ? "1MB" : "1MB"})</p>
                            </div>

                            {acceptedFiles && acceptedFiles[0] ? (
                                <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                                    <div className="px-3 py-2 h-full grid place-items-center">
                                        <File className="h-4 w-4 text-green-500" />
                                    </div>
                                    <div className="px-3 py-2 h-full text-sm truncate">
                                        {acceptedFiles[0].name}
                                    </div>
                                </div>
                            ): null}

                            {isUploading ? (
                                <div className="w-full mt-4 max-w-xs mx-auto">
                                    <Progress
                                        indicatorcolor={uploadProgress === 100 ? 'bg-green-500' : ''}
                                        value={uploadProgress}
                                        className="h-1 w-full bg-zinc-200"/>
                                    {uploadProgress === 100 && isThinking ? (
                                        <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Sedang berpikir...
                                        </div>
                                    ): null}
                                </div>
                            ) : null}
                            <input
                                {...getInputProps()}
                                type='file'
                                id='dropzone-file'
                                className='hidden'
                            />
                        </label>
                    </div>
                </div>
            )}
        </Dropzone>
    )
}

export default UploadDropzone
