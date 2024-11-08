'use client';
import React, { useState, useEffect } from 'react';
import Button from './button';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function BannerSlide(props) {
    const {
        banners,
        className,
        isFullPage,
        isHead,
        height = 400,
        width = 1400,
        isPagination = false,
        rounded = false,
        withButton = false
    } = props;

    const [curr, setCurr] = useState(0);
    const prev = () =>
        setCurr((current) => (current === 0 ? banners.length - 1 : current - 1));
    const next = () =>
        setCurr((current) => (current === banners.length - 1 ? 0 : current + 1));

    useEffect(() => {
        const slidesInterval = setInterval(() => {
            next();
        }, 6000);
        return () => clearInterval(slidesInterval);
    }, []);

    const handleSelectSlide = (index) => {
        setCurr(index);
    };

    return (
        <div
            className={classNames(
                className && className,
                isHead && '',
                isFullPage && 'relative'
            )}
        >
            <div className="relative overflow-hidden md:mt-[50px]">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${curr * 100}%)` }}
                    >
                        {banners.map((item, index) => (
                            <React.Fragment key={index}>
                                {withButton && item.url && (
                                    <div className="absolute left-[15%] top-[70%] md:left-[18%] md:flex 2xl:left-[19%]">
                                        <Button
                                            hover="orange"
                                            icon="/specialty/details/right2.svg"
                                            style="title"
                                            textStyle="text-2xl font-bold uppercase "
                                            title="Đặt lịch ngay"
                                            url={item.url || '#'}
                                        />
                                    </div>
                                )}


                                <img
                                    loading="eager"
                                    alt="banner"
                                    className={classNames(
                                        rounded ? 'rounded-3xl' : '',
                                        isFullPage ? 'h-[200px] md:h-[900px]' : '',
                                        `h-[200px] w-full object-cover md:h-[${height}px]`
                                    )}
                                    style={
                                        !isFullPage
                                            ? { width: `${width}px`, height: `${height}px` }
                                            : { minWidth: '100%' }
                                    }
                                    height={height}
                                    src={item.image_url}
                                    width={width}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {isPagination && (
                    <div className="absolute bottom-4 left-0 right-0 md:mt-6 md:flex">
                        <div className="flex items-center justify-center gap-2">
                            {banners.map((_, i) => (
                                <button
                                    key={i}
                                    className={`h-2 bg-secondary transition-all ${curr === i
                                        ? 'w-6 rounded-[32px]'
                                        : 'w-2 rounded-full bg-gray-500'
                                        } `}
                                    onClick={() => handleSelectSlide(i)}
                                    type="button"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {banners.length > 1 && (
                <>
                    <button
                        className="absolute left-[5%] top-[45%] hidden h-[3%] w-[3%] lg:block"
                        onClick={prev}
                        type="button"
                    >
                        <img
                            loading="eager"
                            alt="prev"
                            className="rounded-full bg-gray-300 bg-opacity-70 p-1 hover:bg-opacity-100 lg:p-2"
                            height={50}
                            src="/images/icons/left-arrow.svg"
                            width={50}
                        />
                    </button>
                    <button
                        className="absolute right-[5%] top-[45%] hidden h-[3%] w-[3%] lg:block"
                        onClick={next}
                        type="button"
                    >
                        <img
                            loading="eager"
                            alt="next"
                            className="rounded-full bg-gray-300 bg-opacity-70 p-1 hover:bg-opacity-100 md:p-1.5 lg:p-2"
                            height={50}
                            src="/images/icons/white-arrow.svg"
                            width={50}
                        />
                    </button>
                </>
            )}
        </div>
    );
}
