import React from 'react'

const Track = () => {
    return (
        <section>
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-10 md:py-14">
                {/* main  */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                    {/* Track 1 */}
                    <div className="w-full">
                        <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"  >
                            <svg className="theme-primary-text w-12 h-12 mb-3 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>

                            <h2 className="title-font font-medium text-lg text-gray-900" >Premium Brands</h2>
                            <p className="leading-relaxed">Our Brands are 100% Trusted.
                            </p>
                        </div>
                    </div>

                    {/* Track 2 */}
                    <div className="w-full">
                        <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"  >
                            <svg className="theme-primary-text w-12 h-12 mb-3 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-9.75M18 9.75l-3 3m0 0l-3-3m3 3V6.75" />
                            </svg>

                            <h2 className="title-font font-medium text-lg text-gray-900" >Free Shipping</h2>
                            <p className="leading-relaxed">Free Shipping on Orders Over ₹5000.
                            </p>
                        </div>
                    </div>

                    {/* Track 3  */}
                    <div className="w-full">
                        <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"  >
                            <svg className="theme-primary-text w-12 h-12 mb-3 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>

                            <h2 className="title-font font-medium text-lg text-gray-900" >Secure Payment</h2>
                            <p className="leading-relaxed">Your Payment Information is Always Secure.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Track;
