import React from 'react';

const PlatformAims: React.FC = () => {
    return (
        <div className="w-full flex justify-start items-center font-bold font-arial
        smallPhone:h-[30vh] smallPhone:px-2 smallPhone:py-1
        phone:h-[40vh] phone:px-4 phone:py-2
        tablet:h-[50vh] tablet:px-6 tablet:py-3
        laptop:h-[60vh] laptop:px-8 laptop:py-4
        desktop:h-[70vh] desktop:px-12 desktop:py-6
        ">
            <div className="img bg-origin-content bg-two-friend-talk w-[50%] bg-contain bg-left h-full bg-no-repeat"></div>
            <div className="
            smallPhone:text-md smallPhone:ml-[5rem]
            phone:text-lg phone:ml-[8rem]
            tablet:text-xl tablet:ml-[10rem]
            laptop:text-2xl laptop:ml-[12rem]
            desktop:text-3xl desktop:ml-[14rem]
            flex-nowrap
            ">Find Job | Meet People</div>
        </div>
    );
}


export default PlatformAims;