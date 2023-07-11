"use client"

import { useEffect, useState } from 'react'; 
import { getProviders, signIn } from 'next-auth/react';

export default function loginPage() {
    const [data, setData] = useState([]);

    function fetchProviders() {
        useEffect(() => {

            const fetchData = async () => {
                const data = await getProviders();
                const providers = Object.values(data);
                setData(providers);
            }

            fetchData();
        }, [])
    }

    fetchProviders();
    return (
        <main className="flex">
        <h1 className="font-primary text-brand-textHeader text-6xl">
          {data.map(provider => (
            <div key={provider.name}>
                <button onClick={() => signIn(provider.id)}>
                    Sign in with {provider.name}
                </button>
            </div>
          ))}
        </h1>
      </main>
    )
}