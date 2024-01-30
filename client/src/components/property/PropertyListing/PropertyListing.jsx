import React, { useEffect, useReducer } from 'react';
import Description from './steps/Description';
import Media from './steps/Media';
import Location from './steps/Location';
import Details from './steps/Details';
import Payment from './steps/Payment';

const initialState = {
    step: 1,
    formData: {
        description: '',
        media: [],
        location: '',
        detail: '',
        payment: [],
    },
};

function reducer(state, action) {
    switch (action.type) {
        case 'nextStep':
            return { ...state, step: state.step + 1 };
        case 'previousStep':
            return { ...state, step: state.step - 1 };
        case 'saveFormData':
            return { ...state, formData: { ...state.formData, ...action.data, location: { ...state.formData.location, ...action.data.location } } };
        default:
            return state;
    }
}

const steps = {
    1: { component: Description, name: 'Description' },
    2: { component: Media, name: 'Media' },
    3: { component: Location, name: 'Location' },
    4: { component: Details, name: 'Details' },
    5: { component: Payment, name: 'Payment' },
};

const PropertyListing = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { step, formData } = state;

    const nextStep = () => {
        if (step < Object.keys(steps).length) {
            dispatch({ type: 'nextStep' });
        }
    };

    const previousStep = () => dispatch({ type: 'previousStep' });

    const saveFormData = (data) => {
        dispatch({ type: 'saveFormData', data });
        console.log(formData);
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const { component: StepComponent } = steps[step];

    const isStepCompleted = () => {
        switch (state.step) {
            case 1:
                return state.formData.description && state.formData.description.trim() !== '' &&
                    state.formData.personalDetails && state.formData.forDetails &&
                    state.formData.propertyType && (state.formData.propertyType !== 'flat' || state.formData.totalFlats);
            case 2:
                return state.formData.media && state.formData.media.length > 0;
            case 3:
                return state.formData.location.lat !== '' && state.formData.location.lng !== '';
            case 4:
                return state.formData.bedrooms && state.formData.bathrooms && state.formData.coveredArea &&
                    state.formData.carpetArea && state.formData.constructionYear;
            case 5:
                return state.formData.payment && state.formData.payment.length > 0;
            default:
                return true;
        }
    };

    const isLastStep = step === Object.keys(steps).length;

    return (
        <div className="p-10 relative">
            <div className="steps">
                <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500">
                    {Object.keys(steps).map((index) => {
                        const { name: stepName } = steps[index];
                        return (
                            <li key={index} className={`flex md:w-full items-center ${step > index ? 'text-blue-600' : 'text-gray-500'} after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`} >
                                <span className={`flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 ${step > index ? 'text-blue-600 dark:text-blue-500' : ''}`} >
                                    {step > index && (
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" >
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                    )}
                                    <span className="hidden sm:inline-flex sm:ms-2">{stepName}</span>
                                </span>
                            </li>
                        );
                    })}
                </ol>
                <div />
            </div>
            <StepComponent formData={formData} setFormData={saveFormData} saveFormData={saveFormData} />
            <div className="flex justify-between">
                {step !== 1 && (
                    <button onClick={previousStep} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md cursor-pointer">
                        Previous
                    </button>
                )}
                {!isLastStep && (
                    <button onClick={nextStep} className={`bg-blue-500 text-white px-4 py-2 rounded-md ${isStepCompleted() ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default PropertyListing;
