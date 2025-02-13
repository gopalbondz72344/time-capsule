const About = () => {


    return (
        <div id="about" className="relative w-full h-screen">
            <img
                src="/timecapsule.jpg"
                alt="Time Capsule"
                className="w-full h-full  sm:h-screen object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="about-content max-w-4xl px-4 md:px-6 sm:px-8 text-white">
                    <h1 className="md:text-5xl counter-font text-3xl font-bold md:mb-4">About</h1>
                    <p className="md:text-xl counter-font text-xs text-justify break-words leading-relaxed">
                        The story behind our time capsule is a journey through the essence of memory, history,
                        and preservation. Our goal is to create a bridge between the past, present, and future
                        by capturing moments that hold significance and meaning. This time capsule serves as a
                        testament to human experience, showcasing the milestones, dreams, and transformations
                        that define our collective journey. By preserving artifacts, stories, and emotions,
                        we offer future generations a glimpse into our world as it is today. Each element
                        within this capsule has been carefully chosen to reflect the spirit of our era,
                        immortalizing the thoughts, feelings, and innovations that drive our society forward.
                        We believe that by revisiting the past, we can better understand the present and shape
                        a more thoughtful future. Our time capsule invites you to be a part of this legacy,
                        to explore the depths of shared history, and to embrace the timeless connection that
                        unites us all. Whether it&apos;s a letter to future generations, a piece of art, or a simple
                        memento, every item inside tells a story worth preserving. Join us in this remarkable
                        endeavor to leave behind a legacy of inspiration, curiosity, and hope.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
