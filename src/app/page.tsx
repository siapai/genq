"use client"
import {useForm} from "react-hook-form";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import {cn} from "@/lib/utils";
import UploadButton, {InferenceResponse} from "@/components/UploadButton";
import UploadDropzone from "@/components/UploadButton";
import DisplayResult from "@/components/DisplayResult";
import {useState} from "react";

export default function Home() {

  const [results, setResults] = useState<InferenceResponse[]>([])

  const handleFormSubmit = (data: File) => {
    console.log(data)
  }
  const defaultValues: { file: null | File } = {
    file: null,
  };
  const methods = useForm({
    defaultValues,
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
  });

  function handleOnDrop(acceptedFiles: FileList | null) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const allowedTypes = [
        { name: "JPEG", types: ["image/jpg"] },
        { name: "JPEG", types: ["image/jpeg"] },
        { name: "PNG", types: ["image/png"] },

      ];
      const fileType = allowedTypes.find((allowedType) =>
        allowedType.types.find((type) => type === acceptedFiles[0].type)
      );
      if (!fileType) {
        methods.setValue("file", null);
        methods.setError("file", {
          message: "File type is not valid",
          type: "typeError",
        });
      } else {
        methods.setValue("file", acceptedFiles[0]);
        methods.clearErrors("file");
      }
    } else {
      methods.setValue("file", null);
      methods.setError("file", {
        message: "File is required",
        type: "typeError",
      });
    }
  }
  return (
    <>

      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className={cn('mx-auto mb-4 flex max-w-fit',
          'items-center justify-center space-x-2 overflow-hidden rounded-full',
          'border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all',
          'hover:border-gray-300 hover:bg-white')}>
          <p className="text-sm font-semibold text-gray-700">Tanya <span className="text-green-600">GenQ </span> Gender
            Dari Foto</p>
        </div>
        <h1 className="max-w-4xl text-4xl font-bold md:text-5xl lg:text-6xl">
          Unggah Foto, Dapatkan Jawaban <span className="text-green-600">Gender</span> yang <span className="text-green-600">Akurat!</span>
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          GenQ adalah aplikasi yang cerdas dan menyenangkan untuk menebak jenis kelamin seseorang dari foto yang
          diunggah.           GenQ juga mendukung detektsi foto yang memiliki banyak wajah lho! Langsung coba gratis...
        </p>

        <div className="mt-16"/>
        <UploadDropzone onResult={(data) => data && setResults(data)} onErrorResult={() => setResults([])}/>
        <div className="relative isolate  mt-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div style={{
              clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            }}
                 className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2BC96D] to-[#D3D3D3] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"/>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {results.map(result =>
              <DisplayResult key={result.name} data={result}/>
            )}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div style={{
              clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            }}
                 className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2BC96D] to-[#D3D3D3] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"/>
          </div>
        </div>
      </MaxWidthWrapper>
      {/*Feature section*/}
      <div className="mx-auto px-4 mb-32 mt-32 w-full max-w-screen-xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">Prediksi Gender Secara <span className="text-green-600">Instant </span> Dengan <span className="text-green-600">GenQ!</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Dibangun dengan algoritma yang teruji, GenQ memberikan prediksi jenis kelamin yang akurat berdasarkan
              analisis gambar wajah.
            </p>
          </div>
        </div>

        {/*Steps*/}
        <ol className="my-12 space-y-4 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div
              className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-green-600">Langkah 1</span>
              <span className="text-xl font-semibold">Persiapkan Foto</span>
              <span className="mt-2 text-zinc-700">
                            Persiapkan foto yang memiliki wajah.
                          </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div
              className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-green-600">Langkah 2</span>
              <span className="text-xl font-semibold">Unggah Foto</span>
              <span className="mt-2 text-zinc-700">
                             Klik atau Drop untuk mengunggah foto. File foto bisa berupa jpg, jpeg, png, atau webp.
                          </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div
              className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-green-600">Langkah 3</span>
              <span className="text-xl font-semibold">Prediksi</span>
              <span className="mt-2 text-zinc-700">
                            Mesin akan menebak foto yang diunggah apakah berjenis kelamin laki-laki atau perempuan.
                          </span>
            </div>
          </li>
        </ol>
      </div>

      {/*Footer*/}
      <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <img src="/ai-01.png" className="w-60"/>

            <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <span
                className="self-center text-3xl font-semibold whitespace-nowrap text-green-900">Van Rossum Team</span>
            </a>
            <ul
              className="flex flex-wrap items-center mb-6 text-sm font-medium text-green-900 sm:mb-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">About</a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Contact</a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-emerald-700 lg:my-8"/>
          <span className="block text-sm text-green-700 sm:text-center">© 2024 <a
            href="#" className="hover:underline">Van Rossum Team</a></span>
        </div>
      </footer>
    </>
  )

}
