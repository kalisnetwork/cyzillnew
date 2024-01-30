import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";

const plans = [
    {
        name: 'Bronze',
        days: '29 days',
        support: 'Business hours only',
        listing: 'Instantly',
        emailSupport: true,
        phoneSupport: false,
        inquiry: 'Unlimited',
        price: '₹ 49',
        color: 'bg-bronze', // Tailwind CSS class for background color
    },
    {
        name: 'Silver',
        days: '89 days',
        support: 'Business hours only',
        listing: 'Instantly',
        emailSupport: true,
        phoneSupport: false,
        inquiry: 'Unlimited',
        price: '₹ 129',
        color: 'bg-silver', // Tailwind CSS class for background color
    },
    {
        name: 'Gold',
        days: '186 days',
        support: 'Business hours only',
        listing: 'Instantly',
        emailSupport: true,
        phoneSupport: false,
        inquiry: 'Unlimited',
        price: '₹ 309',
        color: 'bg-gold', // Tailwind CSS class for background color
    },
    {
        name: 'Platinum',
        days: '365 days',
        support: 'Business hours only',
        listing: 'Instantly',
        emailSupport: true,
        phoneSupport: true,
        inquiry: 'Unlimited',
        price: '₹ 369',
        color: 'bg-platinum', // Tailwind CSS class for background color
    },
];

function PlanCard({ plan }) {
    return (
        <Card className={`max-w-[400px] m-4 ${plan.name === 'Gold' ? 'w-full' : ''} ${plan.color}`} shadow>
            <CardHeader className="flex gap-3 justify-center items-center">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
            </CardHeader>
            <Divider y={0} />
            <CardBody>
                <p>Days: {plan.days}</p>
                <p>Support: {plan.support}</p>
                <p>Property Listing: {plan.listing}</p>
                <p>Email Support: {plan.emailSupport ? '✓' : 'X'}</p>
                <p>Phone Support: {plan.phoneSupport ? '✓' : 'X'}</p>
                <p>Buyer Inquiry: {plan.inquiry}</p>
            </CardBody>
            <Divider y={0} />
            <CardFooter className="justify-center">
                <Link color block>{plan.price}</Link>
            </CardFooter>
        </Card>
    );
}

export default function MembershipPlans() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-wrap items-center">
                {plans.map((plan, index) => (
                    <PlanCard key={index} plan={plan} />
                ))}
            </div>
        </div>
    );
}