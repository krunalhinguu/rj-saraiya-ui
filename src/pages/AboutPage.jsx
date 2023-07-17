import React from "react";

const AboutPage = () => {
  return (
    <body className="bg-gray-50">
      {/* info */}
      <section class="flex flex-col gap-10 bg-gray-50 my-10 mx-10 justify-center items-center md:flex-row lg:gap-40 lg:my-20">
        {/* image-1*/}
        <div className="w-90">
          <img class="" src="./images/logo.png" alt="user" />
        </div>
        {/* text */}
        <div>
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-[#e40414] text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl ">
              Ramanlal J Saraiya
            </h1>
            <p className="max-w-2xl mb-4 text-gray-400 text-xl font-extrabold leading-none tracking-tight md:text-xl xl:text-xl ">
              <div class="flex flex-wrap gap-2">
                <p className="text-md">Follow us on @rjsaraiya</p>

                {/* facebook */}
                <a
                  class=" font-semibold text-white inline-flex items-center space-x-2 rounded"
                  href="https://www.facebook.com/profile.php?id=100093529302348&mibextid=LQQJ4d"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    class="w-10 h-10 fill-current"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    style={{ color: "#3b5998" }}
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* instagram */}
                <a
                  class=" font-semibold text-white inline-flex items-center space-x-2 rounded"
                  href="https://www.instagram.com/rjsaraiya/  "
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-10 h-10 fill-current"
                    viewBox="0 0 102 102"
                    id="instagram"
                  >
                    <defs>
                      <radialGradient
                        id="a"
                        cx="6.601"
                        cy="99.766"
                        r="129.502"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset=".09" stop-color="#fa8f21"></stop>
                        <stop offset=".78" stop-color="#d82d7e"></stop>
                      </radialGradient>
                      <radialGradient
                        id="b"
                        cx="70.652"
                        cy="96.49"
                        r="113.963"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop
                          offset=".64"
                          stop-color="#8c3aaa"
                          stop-opacity="0"
                        ></stop>
                        <stop offset="1" stop-color="#8c3aaa"></stop>
                      </radialGradient>
                    </defs>
                    <path
                      fill="url(#a)"
                      d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"
                      data-name="Path 16"
                    ></path>
                    <path
                      fill="url(#b)"
                      d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"
                      data-name="Path 17"
                    ></path>
                    <path
                      fill="#fff"
                      d="M461.114,477.413a12.631,12.631,0,1,1,12.629,12.632,12.631,12.631,0,0,1-12.629-12.632m-6.829,0a19.458,19.458,0,1,0,19.458-19.458,19.457,19.457,0,0,0-19.458,19.458m35.139-20.229a4.547,4.547,0,1,0,4.549-4.545h0a4.549,4.549,0,0,0-4.547,4.545m-30.99,51.074a20.943,20.943,0,0,1-7.037-1.3,12.547,12.547,0,0,1-7.193-7.19,20.923,20.923,0,0,1-1.3-7.037c-.184-3.994-.22-5.194-.22-15.313s.04-11.316.22-15.314a21.082,21.082,0,0,1,1.3-7.037,12.54,12.54,0,0,1,7.193-7.193,20.924,20.924,0,0,1,7.037-1.3c3.994-.184,5.194-.22,15.309-.22s11.316.039,15.314.221a21.082,21.082,0,0,1,7.037,1.3,12.541,12.541,0,0,1,7.193,7.193,20.926,20.926,0,0,1,1.3,7.037c.184,4,.22,5.194.22,15.314s-.037,11.316-.22,15.314a21.023,21.023,0,0,1-1.3,7.037,12.547,12.547,0,0,1-7.193,7.19,20.925,20.925,0,0,1-7.037,1.3c-3.994.184-5.194.22-15.314.22s-11.316-.037-15.309-.22m-.314-68.509a27.786,27.786,0,0,0-9.2,1.76,19.373,19.373,0,0,0-11.083,11.083,27.794,27.794,0,0,0-1.76,9.2c-.187,4.04-.229,5.332-.229,15.623s.043,11.582.229,15.623a27.793,27.793,0,0,0,1.76,9.2,19.374,19.374,0,0,0,11.083,11.083,27.813,27.813,0,0,0,9.2,1.76c4.042.184,5.332.229,15.623.229s11.582-.043,15.623-.229a27.8,27.8,0,0,0,9.2-1.76,19.374,19.374,0,0,0,11.083-11.083,27.716,27.716,0,0,0,1.76-9.2c.184-4.043.226-5.332.226-15.623s-.043-11.582-.226-15.623a27.786,27.786,0,0,0-1.76-9.2,19.379,19.379,0,0,0-11.08-11.083,27.748,27.748,0,0,0-9.2-1.76c-4.041-.185-5.332-.229-15.621-.229s-11.583.043-15.626.229"
                      data-name="Path 18"
                      transform="translate(-422.637 -426.196)"
                    ></path>
                  </svg>
                </a>
                {/* twitter */}
                <a
                  class="bg-blue-400 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
                  href="https://twitter.com/rjsaraiya"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    class="w-5 h-5 fill-current"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
              <p className="mt-5 flex items-center">
                To order call/ whastapp us on {/* whatsapp */}
                <a
                  class=" m-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
                  href="https://wa.me/message/N4GAW62EQ6ALI1"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    class="w-10 h-10 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 500"
                    style={{ color: "#47C756" }}
                  >
                    <path d="M224 122.8c-72.7 0-131.8 59.1-131.9 131.8 0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6 49.9-13.1 4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8 0-35.2-15.2-68.3-40.1-93.2-25-25-58-38.7-93.2-38.7zm77.5 188.4c-3.3 9.3-19.1 17.7-26.7 18.8-12.6 1.9-22.4.9-47.5-9.9-39.7-17.2-65.7-57.2-67.7-59.8-2-2.6-16.2-21.5-16.2-41s10.2-29.1 13.9-33.1c3.6-4 7.9-5 10.6-5 2.6 0 5.3 0 7.6.1 2.4.1 5.7-.9 8.9 6.8 3.3 7.9 11.2 27.4 12.2 29.4s1.7 4.3.3 6.9c-7.6 15.2-15.7 14.6-11.6 21.6 15.3 26.3 30.6 35.4 53.9 47.1 4 2 6.3 1.7 8.6-1 2.3-2.6 9.9-11.6 12.5-15.5 2.6-4 5.3-3.3 8.9-2 3.6 1.3 23.1 10.9 27.1 12.9s6.6 3 7.6 4.6c.9 1.9.9 9.9-2.4 19.1zM400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM223.9 413.2c-26.6 0-52.7-6.7-75.8-19.3L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5 29.9 30 47.9 69.8 47.9 112.2 0 87.4-72.7 158.5-160.1 158.5z" />
                  </svg>
                </a>
                +91-9879973280.
              </p>
              <p>For any queries email us at ramanlaljsaraiya@gmail.com</p>
            </p>
            <p class="max-w-3xl mb-3 text-gray-500 md:text-lg lg:text-xl ">
              Welcome to our esteemed shop, where tradition meets excellence in
              craftsmanship. With <b>over 90 years</b> of expertise, Your
              one-stop shop for fragrances, wedding essentials, divine
              offerings, and traditional adornments.
            </p>
            <p class="max-w-3xl mb-3 text-gray-500 md:text-lg lg:text-xl">
              Steeped in tradition, we understand the importance of wedding
              rituals and the cultural significance they hold. Our extensive
              range of wedding ritual items showcases the rich diversity and
              artistry of different cultures, allowing you to find the perfect
              elements to enhance your special day. Whether you're seeking
              intricately designed puja thalis, ornate garlands, sacred thread
              ceremonies accessories, or ceremonial lamps, we have a wide
              selection to cater to your specific needs.
            </p>
          </div>
        </div>
        {/* image-2 */}
        <div class="flex">
          <div className="lg:w-80 sm:w-50 md:w-50">
            <img class="shadow-sm" src="./images/founder.jpg" alt="user " />
            <p className="mt-2 text-center font-bold">Ramanlal J Raval</p>
          </div>
          <div className="lg:w-80 sm:w-50 md:w-50">
            <img class="shadow-sm" src="./images/co-founder.jpg" alt="user " />
            <p className="mt-2 text-center font-bold">Pankaj A Raval</p>
          </div>
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
                <img src="./images/image2.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/image3.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/image6.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/image7.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/image8.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/image2.jpg" alt="product-iamge" />
              </div>
              {/* <!-- same 9 slides doubled (duplicate) --> */}
              <div className="slide">
                <img src="./images/image3.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/image6.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/image7.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/image8.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/image2.jpg" alt="product-iamge" />
              </div>
              <div className="slide">
                <img src="./images/image3.jpg" alt="product-iamge" />
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
              {/* <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"> */}
              <img src="./images/product1.jpg" alt="product" />
              {/* </div> */}
            </div>
            <div className="inline-block px-3">
              {/* <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"> */}
              <img src="./images/product2.jpg" alt="product" />
              {/* </div> */}
            </div>
            <div className="inline-block px-3">
              {/* <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"> */}
              <img src="./images/product3.jpg" alt="product" />
              {/* </div> */}
            </div>
            <div className="inline-block px-3">
              {/* <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"> */}
              <img src="./images/product4.jpg" alt="product" />
              {/* </div> */}
            </div>
            <div className="inline-block px-3">
              {/* <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"> */}
              <img src="./images/product5.jpg" alt="productct" />
              {/* </div> */}
            </div>
            <div className="inline-block px-3">
              {/* <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"> */}
              <img src="./images/product6.jpg" alt="product" />
              {/* </div> */}
            </div>
            <div className="inline-block px-3">
              {/* <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"> */}
              <img src="./images/product7.jpg" alt="product" />
              {/* </div> */}
            </div>
            <div className="inline-block px-3">
              {/* <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"> */}
              <img src="./images/product13.jpeg" alt="product" />
              {/* </div> */}
            </div>
            <div className="inline-block px-3">
              {/* <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"> */}
              <img src="./images/product14.jpeg" alt="product" />
              {/* </div> */}
            </div>
            <div className="inline-block px-3">
              {/* <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"> */}
              <img src="./images/product15.jpeg" alt="product" />
              {/* </div> */}
            </div>
            <div className="inline-block px-3">
              {/* <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"> */}
              <img src="./images/product8.jpeg" alt="product" />
              {/* </div> */}
            </div>
            <div className="inline-block px-3">
              {/* <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"> */}
              <img src="./images/product9.jpeg" alt="product" />
              {/* </div> */}
            </div>
            <div className="inline-block px-3">
              {/* <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"> */}
              <img src="./images/product10.jpeg" alt="product" />
              {/* </div> */}
            </div>
            <div className="inline-block px-3">
              {/* <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"> */}
              <img src="./images/product11.jpeg" alt="product" />
              {/* </div> */}
            </div>
            <div className="inline-block px-3">
              {/* <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"> */}
              <img src="./images/product12.jpeg" alt="product" />
              {/* </div> */}
            </div>
            {/* <div className="inline-block px-3">
              <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img src="./images/aggarbatti.jpg" alt="product" />
              </div>
            </div> */}
            {/* <div className="inline-block px-3">
              <div className="max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <p className="text-3xl py-[88px] text-slate-500 font-bold text-center">
                  Many More...
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* history */}
      <section className="bg-white ">
        <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
          <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <div className="text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 ">
                Established by Ramanlal J. Raval
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
              src="./images/old.jpg"
              alt="dashboard feature product"
            />
          </div>

          <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <img
              className="w-full mb-4 rounded-lg lg:mb-0 lg:flex"
              src="./images/new.jpg"
              alt="feature product 2"
            />
            <div className="text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 ">
                Even after more than 90 years
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
