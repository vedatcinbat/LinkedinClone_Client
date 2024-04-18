import React from 'react';

const JobsFeatures: React.FC  = () => {
    return (
        <div className="w-full bg-light-dark flex justify-start items-center font-bold font-arial
        smallPhone:h-[30vh] smallPhone:px-2 smallPhone:py-1
        phone:h-[40vh] phone:px-4 phone:py-2
        tablet:h-[50vh] tablet:px-6 tablet:py-3
        laptop:h-[60vh] laptop:px-8 laptop:py-4
        desktop:h-[70vh] desktop:px-12 desktop:py-6
        ">
            <div className="bg-light-light w-full h-[30rem]">
                Jobs Features
            </div>
        </div>
    )
}

export default JobsFeatures;