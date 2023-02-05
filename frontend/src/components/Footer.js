export default function Footer() {

    return (
        <footer className="bg-stroke sticky top-[99vh]">
            <p className="text-center text-sec-300">WhatFood. 
            Made by <a className="font-bold" href="https://eshtropy.se">Esh</a> {new Date().getFullYear()}. 
            See more over at <a className="font-bold" href="https://github.com/hyddeos/What-Food">Github</a>.</p>
        </footer>
    );
    }