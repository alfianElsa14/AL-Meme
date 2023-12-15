const calculateCountdown = (userProfile, setCountdown) => {
    if (userProfile.role === 'premium' && userProfile.premiumDate) {
        const currentTime = new Date();
        const premiumEndDate = new Date(userProfile.premiumDate);

        const timeDifference = premiumEndDate.getTime() - currentTime.getTime();

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        if (days >= 0 && hours >= 0 && minutes >= 0 && seconds >= 0) {
            setCountdown({ days, hours, minutes, seconds });
        } else {
            setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
    }
};

export default calculateCountdown;