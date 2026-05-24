import React from 'react';

const AboutPage = () => {
    // Team members ka data dynamic grid ke liye
    const teamMembers = [
        {
            name: "Zeeshan Ahmed",
            role: "Founder & Lead Developer",
            bio: "MERN Stack expert with 5+ years of experience building scalable applications.",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
        },
        {
            name: "Ayesha Khan",
            role: "UI/UX Designer",
            bio: "Passionate about creating clean, user-centric, and accessible digital experiences.",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80"
        },
        {
            name: "Hamza Bilal",
            role: "Content Strategist",
            bio: "Specializes in technical writing, SEO, and community building.",
            image: "https://images.unsplash.com/photo-13938676-a19e07508735?auto=format&fit=crop&w=300&q=80"
        }
    ];

    // Core values ka data
    const coreValues = [
        { title: "Quality Content", desc: "Hum har article me accuracy aur deep knowledge ko tarjeeh dete hain." },
        { title: "Community First", desc: "Developers aur readers ke liye ek seekhne aur agay barhne ka mahool." },
        { title: "Continuous Innovation", desc: "Naye frameworks aur dynamic tech trends ko foran adapt karna." }
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            
            {/* 1. Hero Section */}
            <div className="relative bg-gradient-to-r from-indigo-700 to-purple-800 text-white py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative max-w-3xl mx-auto space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        Our Mission & Story
                    </h1>
                    <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto">
                        Humara maqsad tech community ko behtareen knowledge, premium tutorials, aur engineering insights faraham karna hai.
                    </p>
                </div>
            </div>

            {/* 2. Content & Vision Section */}
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Hum Yeh Kyun Kar Rahe Hain?
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-base">
                            Tech ki duniya bohot tezi se badal rahi hai. Aise me sahi aur filter ki hui maloomat milna bohot mushkil ho jata hai. Humne is platform ko isliye banaya taake free resources ke sath-sath high-quality, research-backed premium articles bhi un logo tak pohnchayein jo serious learning chahte hain.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-base">
                            Chahe aap ek beginner hon jo pehla code seekh raha hai, ya ek senior architect jo modern cloud infrastructures par kaam kar raha hai — hamara platform har level ke developer ke liye kuch na kuch khas rakhta hai.
                        </p>
                    </div>
                    
                    {/* Visual Card / Feature Display */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                        <h3 className="text-xl font-bold text-indigo-600">Our Core Principles</h3>
                        <div className="space-y-4">
                            {coreValues.map((value, idx) => (
                                <div key={idx} className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 mt-1 bg-indigo-50 text-indigo-600 rounded-lg p-1.5 font-bold text-sm">
                                        ✓
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{value.title}</h4>
                                        <p className="text-sm text-gray-500">{value.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Stats Banner */}
                <div className="mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600">50+</div>
                        <div className="text-sm font-medium text-gray-500 mt-1">Tech Articles</div>
                    </div>
                    <div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600">10k+</div>
                        <div className="text-sm font-medium text-gray-500 mt-1">Monthly Readers</div>
                    </div>
                    <div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600">99%</div>
                        <div className="text-sm font-medium text-gray-500 mt-1">Satisfaction Rate</div>
                    </div>
                    <div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600">24/7</div>
                        <div className="text-sm font-medium text-gray-500 mt-1">Community Support</div>
                    </div>
                </div>

                {/* 4. Team Section */}
                <div className="mt-24 space-y-12">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Meet the Minds</h2>
                        <p className="text-gray-500 text-lg max-w-xl mx-auto">
                            Is platform ke peeche jo log hain jo din raat is content aur platform ko behtar banane me kaam karte hain.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 text-center p-6 flex flex-col items-center space-y-4"
                            >
                                <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-50"
                                />
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                                    <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">{member.role}</p>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutPage;