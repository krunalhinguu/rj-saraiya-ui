import React from "react";

const AboutPage = () => {
  return (
    <body className="bg-gray-50">
      {/* info */}
      <section class="flex flex-col gap-10 bg-gray-50 my-10 mx-10 justify-center items-center md:flex-row lg:gap-40 lg:my-20">
        {/* image-1*/}
        <div class="w-36">
          <img
            class="rounded-full border-4 border-solid border-red-300 shadow-sm"
            src="https://randomuser.me/api/portraits/men/18.jpg"
            alt="user"
          />
          <p className="mt-2 text-center font-bold">Ramanlal J Raval</p>
          <p className="text-center font-bold text-sm text-slate-500">
            (Founder)
          </p>
        </div>
        {/* text */}
        <div>
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-[#e40414] text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl ">
              Ramanlal J Saraiya
            </h1>
            <p class="max-w-3xl mb-3 text-gray-500 md:text-lg lg:text-xl ">
              Established in the 1980s by Ramanlal J. Raval, our shop stands as
              one of the oldest and most trusted establishments in the town.
              With a rich heritage spanning four generations, we specialize in
              providing top-quality saffron turmeric/केशर पीठी, Mataji Pujapa
              items, Gugal dhoop, loban, fragrances, and premium agarbatti.
            </p>
            <p class="max-w-2xl mb-3 text-gray-500 md:text-lg lg:text-xl">
              Our success and longevity can be attributed to the unwavering
              dedication of our family, who have diligently carried forward the
              legacy initiated by Ramanlal J. Saraiya. By embracing new
              opportunities and staying true to our roots, we have not only
              survived but thrived in the ever-changing market
            </p>
          </div>
        </div>
        {/* image-2 */}
        <div class="w-36">
          <img
            class="rounded-full border-4 border-solid border-red-300 shadow-sm"
            src="https://randomuser.me/api/portraits/men/71.jpg"
            alt="user "
          />
          <p className="mt-2 text-center font-bold">Ramanlal J Raval</p>
          <p className="text-center font-bold text-sm text-slate-500">
            (Co-Founder)
          </p>
        </div>
      </section>

      {/* photo gallery */}
      <section className="bg-white">
        <div className="flex flex-col m-auto p-5">
          <h1 className="m-5 font-bold text-4xl text-gray-600">
            Photo Gallery
          </h1>
          <div className="slider">
            <div className="slide-track">
              <div className="slide">
                <img src="./images/1.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/1.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/2.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/3.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/1.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/2.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/3.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/1.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/2.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/3.jpg" alt="product-iamge" />
              </div>
              {/* <!-- same 9 slides doubled (duplicate) --> */}
              <div className="slide">
                <img src="./images/1.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/2.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/3.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/1.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/2.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/3.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/1.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/2.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/3.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/1.jpg" alt="product-iamge" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* products */}
      <section className="bg-gray-50">
        <div className="flex flex-col m-auto p-5">
          <h1 className="m-5 font-bold text-4xl text-gray-600">Our Products</h1>
          <div className="grid mx-auto gap-y-10 gap-x-5 m-2 lg:grid-cols-5 md:grid-cols-3 grid-cols-1">
            <div className="inline-block px-3">
              <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src="./images/haldi.jpg" alt="product" />
              </div>
            </div>
            <div className="inline-block px-3">
              <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src="./images/perfume.jpg" alt="product" />
              </div>
            </div>
            <div className="inline-block px-3">
              <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src="./images/meena.jpg" alt="product" />
              </div>
            </div>
            <div className="inline-block px-3">
              <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src="./images/aggarbatti.jpg" alt="product" />
              </div>
            </div>
            <div className="inline-block px-3">
              <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src="./images/haldi.jpg" alt="productct" />
              </div>
            </div>
            <div className="inline-block px-3">
              <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src="./images/perfume.jpg" alt="product" />
              </div>
            </div>
            <div className="inline-block px-3">
              <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src="./images/meena.jpg" alt="product" />
              </div>
            </div>
            <div className="inline-block px-3">
              <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src="./images/aggarbatti.jpg" alt="product" />
              </div>
            </div>
            <div className="inline-block px-3">
              <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <p className="text-3xl py-[88px] text-slate-500 font-bold text-center">
                  Many More...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* history */}
      <section className="bg-white ">
        <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
          <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <div className="text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 ">
                Established in the 1980s by Ramanlal J. Raval
              </h2>
              <p className="mb-8 font-light lg:text-xl">
                Situated in Tran Darwaja (Ahmedabad), our shop holds the
                distinction of being one of the oldest establishments in the
                market. With a rich history that spans decades, we have become
                an integral part of the local community, serving generations of
                customers with dedication and passion.
              </p>

              <p className="mb-8 font-light lg:text-xl">
                Our founder, Ramanlal, laid the foundation of our shop with a
                vision to offer a diverse range of specialty items to cater to
                the unique needs of our customers.
              </p>
            </div>
            <img
              className="w-full mb-4 rounded-lg lg:mb-0 lg:flex"
              src="./images/4.jpg"
              alt="dashboard feature product"
            />
          </div>

          <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <img
              className="w-full mb-4 rounded-lg lg:mb-0 lg:flex"
              src="./images/5.jpg"
              alt="feature product 2"
            />
            <div className="text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 ">
                Even after 40 years
              </h2>
              <p className="mb-8 font-light lg:text-xl">
                We proudly maintain our position as the best in the market. Our
                commitment to excellence, unwavering dedication to quality, and
                customer-centric approach have been the driving forces behind
                our continued success.
              </p>

              <p className="font-light lg:text-xl">
                Over the years, we have witnessed changes in the market, the
                emergence of new competitors, and evolving customer preferences.
                However, we have always stayed true to our core values, ensuring
                that we consistently deliver the finest products and
                unparalleled service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* map */}
      <section className="bg-white">
        <iframe
          title="Ramanlal J Saraiya"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9807916689206!2d72.58162957703065!3d23.02447747917256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85fe4f4a6389%3A0x52524dfae0953faf!2sRamanlal%20J%20saraiya!5e0!3m2!1sen!2sin!4v1682932290695!5m2!1sen!2sin"
          width="100%"
          height="450"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* quote */}
      <section className="bg-gray-50 ">
        <div className="max-w-screen-2xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
          <figure className="max-w-screen-lg mx-auto">
            <svg
              className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p className="text-xl font-medium text-gray-900 md:text-2xl ">
                "Step into the realm of time-honored traditions and experience
                the extraordinary essence of Ramanlal J Saraiya Pithi, where the
                finest ingredients are masterfully blended to create a symphony
                of fragrances, textures, and colors that elevate your rituals to
                unparalleled heights of beauty and significance."
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                  Experience the Tradition, Embrace the Excellence
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      <script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js"></script>
    </body>
  );
};

export default AboutPage;
