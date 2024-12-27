import Link from 'next/link';
import React, { JSX } from 'react';

export default function Component({ id, title, content, date }: { id: string, title: string, content: string, date: string }) {
    return (
        <div key={id} className="border border-gray-200 p-4 my-4">
            <Link href={`/blog/post/${id}`}>
                <h2>{title}</h2>
                <p className="text-gray-500">{date}</p>
                <p>{content}</p>
            </Link>
    
            
        </div>
    );
}
