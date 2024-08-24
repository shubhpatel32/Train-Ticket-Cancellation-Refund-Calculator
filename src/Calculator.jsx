import React, { useState } from 'react';

const Calculator = () => {
    const [fare, setFare] = useState('');
    const [classType, setClassType] = useState('AC 3 Tier');
    const [cancellationTime, setCancellationTime] = useState('');
    const [passenger, setPassenger] = useState(1);
    const [ticketStatus, setTicketStatus] = useState('Confirmed');
    const [refund, setRefund] = useState(null);

    const cancellationCharges = {
        'AC First Class': 240,
        'Executive Class': 240,
        'AC 2 Tier': 200,
        'First Class': 200,
        'AC 3 Tier': 180,
        'AC Chair Car': 180,
        'AC 3 Economy': 180,
        'Sleeper Class': 120,
        'Second Class': 60,
    };

    const cancellationOptions = {
        'Confirmed': [
            "Before 48hrs",
            "Between 48hrs-12hrs",
            "Between 12hrs-4hrs",
            "Between 4hrs-0min"
        ],
        'RAC': [
            "Before 30min",
            "Between 30min-0min"
        ],
        'WL': [
            "Any time",
        ],
        'Tatkal Confirmed': [
            "Any time"
        ],
        'Tatkal Waitlist': [
            "Any time"
        ],
    };

    const calculateRefund = (e) => {
        e.preventDefault();
        let fareValue = parseFloat(fare);

        if (isNaN(fareValue)) {
            alert('Please enter valid numbers for fare.');
            return;
        }

        let refundAmount = 0;

        if (ticketStatus === 'Confirmed') {
            if (cancellationTime === "Before 48hrs") {
                refundAmount = fareValue - cancellationCharges[classType] * passenger;
            } else if (cancellationTime === "Between 48hrs-12hrs") {
                refundAmount = fareValue * 0.75;
            } else if (cancellationTime === "Between 12hrs-4hrs") {
                refundAmount = fareValue * 0.5;
            } else {
                refundAmount = 0;
            }
        } else if (ticketStatus === 'RAC') {
            if (cancellationTime !== "Between 30min-0min") {
                refundAmount = fareValue - 60 * passenger;
            } else {
                refundAmount = "You need to file TDR";
            }
        } else if (ticketStatus === 'WL') {
            refundAmount = fareValue - 60 * passenger;
        } else if (ticketStatus === 'Tatkal Confirmed') {
            refundAmount = 0;
        } else if (ticketStatus === 'Tatkal Waitlist') {
            refundAmount = fareValue - 60 * passenger;
        }

        setRefund(refundAmount);
    };

    return (
        <div className="min-h-screen flex items-center justify-center sm:justify-start sm:pl-20 bg-white tracking-wide sm:py-8 bg-cover bg-center sm:bg-vandebharat">
            <section className="calculator-form p-4 bg-white rounded-lg sm:shadow-lg w-full max-w-md min-h-[39rem]" >
                <h1 className="text-2xl font-semibold text-center mb-6">Refund Calculator</h1>
                <form
                    onSubmit={calculateRefund}
                    className="flex flex-col text-md "
                >
                    <label htmlFor="ticketStatus" className="font-medium">Ticket Status:</label>
                    <select
                        id="ticketStatus"
                        name="ticketStatus"
                        value={ticketStatus}
                        onChange={(e) => {
                            setTicketStatus(e.target.value);
                            setCancellationTime('');
                        }}
                        className="p-2 rounded  focus:border-blue-500 border-2 border-solid border-gray-400"
                        required
                    >
                        <option value="Confirmed">Confirmed (CNF)</option>
                        <option value="RAC">Reservation Against Cancellation (RAC)</option>
                        <option value="WL">Waitlist (WL)</option>
                        <option value="Tatkal Confirmed">Tatkal Confirmed</option>
                        <option value="Tatkal Waitlist">Tatkal Waitlist (TQWL)</option>
                    </select>

                    <label htmlFor="cancellationTime" className="font-medium mt-4">Cancellation Time: </label>
                    <select
                        id="cancellationTime"
                        name="cancellationTime"
                        value={cancellationTime}
                        onChange={(e) => setCancellationTime(e.target.value)}
                        className="p-2 rounded  focus:border-blue-500 border-2 border-solid border-gray-400"
                        required
                    >
                        <option value="" disabled>Select Cancellation Time</option>
                        {cancellationOptions[ticketStatus].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="classType" className="font-medium mt-4">Class Type:</label>
                    {
                        ticketStatus === 'Confirmed' ? (
                            <select
                                id="classType"
                                name="classType"
                                value={classType}
                                onChange={(e) => setClassType(e.target.value)}
                                className="p-2 rounded focus:border-blue-500 border-2 border-solid border-gray-400"
                                required
                            >
                                <option value="AC First Class">AC First Class</option>
                                <option value="Executive Class">Executive Class</option>
                                <option value="AC 2 Tier">AC 2 Tier</option>
                                <option value="First Class">First Class</option>
                                <option value="AC 3 Tier">AC 3 Tier</option>
                                <option value="AC Chair Car">AC Chair Car</option>
                                <option value="AC 3 Economy">AC 3 Economy</option>
                                <option value="Sleeper Class">Sleeper Class</option>
                                <option value="Second Class">Second Class</option>
                            </select>
                        ) : (
                            <input
                                id="classType"
                                name="classType"
                                value="Any"
                                readOnly
                                className="p-2 rounded focus:border-blue-500 border-2 border-solid border-gray-400"
                            />
                        )
                    }

                    <label htmlFor="passenger" className="font-medium mt-4">No. of Passenger:</label>
                    <input
                        type="number"
                        id="passenger"
                        name="passenger"
                        value={passenger}
                        min={1}
                        onChange={(e) => setPassenger(e.target.value)}
                        className="p-2 rounded focus:border-blue-500 border-2 border-solid border-gray-400"
                        required
                    />

                    <label htmlFor="fare" className="font-medium mt-4">Enter Ticket Fare (₹):</label>
                    <input
                        type="number"
                        id="fare"
                        name="fare"
                        value={fare}
                        min={0}
                        onChange={(e) => setFare(e.target.value)}
                        className="p-2 rounded focus:border-blue-500 border-2 border-solid border-gray-400"
                        required
                    />

                    <div className='flex justify-center'>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 px-4 sm:w-1/2 mt-4"
                        >
                            Calculate Refund
                        </button>
                    </div>
                </form>

                {refund !== null && (
                    <div className="mt-4 text-center">
                        <h2 className="text-2xl font-semibold">
                            {refund === 0 ? `Refund Amount: ₹0` : typeof refund === 'number' ? `Refund Amount: ₹${refund.toFixed(2)} - GST` : refund}
                        </h2>
                    </div>
                )}

                <div className='text-center mt-3'>For more details, <a className="text-blue-500 hover:underline" href="https://contents.irctc.co.in/en/eticketCancel.html" >Click here</a>.
                </div>
            </section>
        </div>
    );
};

export default Calculator;
