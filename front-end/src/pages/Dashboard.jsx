export default function Dashboard() {
    return (
        <>
            <h1>Dashboard</h1>
            <p>Take a look around</p>

            <section className="container sidebar-open">
                <section className="main">

                </section>

                {/* SIDEBAR TOGGLE */}
                <section className="sidebar-toggle">
                    <button className="sidebar-toggle">
                        <span className="icon-left-open">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="size-6 icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </span>
                        <span className="icon-right-close">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="size-6 icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </span>
                    </button>
                </section>

                {/* SIDEBAR */}
                <section className="sidebar">

                </section>
            </section>
        </>
    )
}
