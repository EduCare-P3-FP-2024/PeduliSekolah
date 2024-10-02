import Image from "next/image";

export default function Laddingpage() {
  return (
    <>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mt-10 pt-11  ">
          <div className="bg-neutral-500 p-8 rounded-lg flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 text-white">
              <h2 className="text-3xl font-semibold">
                Berdonasilah Kepada Sekolah
              </h2>
              <h1 className="text-3xl font-semibold">
                <span className="italic font-bold">Yang Membutuhkan</span>
              </h1>
              <p className="mt-4 ml-12">
                Supaya Mereka Bisa menikmati pelajaran dengan nyaman.
              </p>
              <p className="mt-4 italic">
                Ulurkan tangan anda untuk mereka yang sedang membutuhkan.
              </p>
            </div>
            <div className="md:w-1/3 mt-6 md:mt-0 md:ml-8">
              <img
                src="https://cdn.antarafoto.com/cache/1200x800/2016/02/11/pendidikan-gratis-warga-kurang-mampu-ccg3-dom.jpg"
                alt="Sekolah Pedia"
                className="shadow-lg h-auto max-w-full rounded-lg"
              />
            </div>
          </div>
        </section>
        {/* About Section */}
        <section className="max-w-7xl mx-auto px-6 mt-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-black">
            Tentang Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-gray-200 p-6 shadow-lg">
              <p className="text-gray-600">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div className="card bg-gray-200 p-6 shadow-lg">
              <p className="text-gray-600">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div className="card bg-gray-200 p-6 shadow-lg">
              <p className="text-gray-600">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
        </section>
    </>
  );
}
