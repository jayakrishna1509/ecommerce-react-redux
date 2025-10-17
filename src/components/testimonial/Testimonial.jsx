import React from 'react'

// Import testimonial images
import p1Image from '../../assets/testimonals/p1.jpeg';
import p2Image from '../../assets/testimonals/p2.jpeg';
import p3Image from '../../assets/testimonals/p3.jpeg';

const Testimonial = () => {
    return (
        <div>
            <section className="text-gray-600 body-font mb-10">
                {/* main  */}
                <div className="container px-4 sm:px-6 lg:px-12 xl:px-16 py-10 mx-auto">
                    {/* Heading  */}
                    <h1 className=' text-center text-3xl font-bold text-black' >Testimonials</h1>
                    {/* para  */}
                    <h2 className=' text-center text-2xl font-semibold mb-10' >What Our <span className=' theme-primary-text'>Customers</span> Are Saying</h2>

                    <div className="flex flex-wrap -m-4">
                        {/* Testimonial 1 */}
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src={p1Image} />
                                <p className="leading-relaxed text-black text-base mb-4">
                                    "E-Kart has completely transformed my online shopping experience. The product quality is exceptional, and the delivery is always on time. Highly recommended for anyone looking for reliable e-commerce!"
                                </p>
                                <span className="inline-block h-1 w-10 rounded theme-primary-bg mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">John Doe</h2>
                                <p className="text-gray-500">Founder</p>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src={p2Image} />
                                <p className="leading-relaxed text-black text-base mb-4">
                                    "Amazing selection of products at competitive prices! The user interface is clean and easy to navigate. I've been a loyal customer for over a year now and never been disappointed."
                                </p>
                                <span className="inline-block h-1 w-10 rounded theme-primary-bg mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Emma Laine</h2>
                                <p className="text-gray-500">UI Developer</p>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="lg:w-1/3 lg:mb-0 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src={p3Image} />
                                <p className="leading-relaxed text-black text-base mb-4">
                                    "Outstanding customer service and fast shipping! The quality of products exceeds expectations. E-Kart has become my go-to platform for all my shopping needs. Five stars!"
                                </p>
                                <span className="inline-block h-1 w-10 rounded theme-primary-bg mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Liam Neeson</h2>
                                <p className="text-gray-500">Senior Product Designer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Testimonial
