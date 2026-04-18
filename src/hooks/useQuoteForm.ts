import { useState } from 'react';

const useQuoteForm = () => {
    const [quoteDetails, setQuoteDetails] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuoteDetails({ ...quoteDetails, [name]: value });
    };

    const validateForm = () => {
        // Implement validation logic here
        return true;
    };

    return { quoteDetails, handleChange, validateForm };
};

export default useQuoteForm;