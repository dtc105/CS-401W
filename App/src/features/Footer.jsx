/**
 * Adds footer information to the bottom of the page
 * 
 * TODO: Refactor the table to stop warning in console
 * @returns feature
 */
function Footer() {
    
    return (
        <footer className="flex bottom-0 w-full bg-white dark:bg-300 text-black dark:text-white border-t border-zinc-100 border-opacity-50 p-4">
            <div id="brandFooterContainer" className="flex flex-col flex-1 justify-items-start items-start">
                <img src="/assets/logo.png" alt="logo image" className="w-8 h-8" />
                <h2>PlanIt <span className="text-zinc-500 align-left text-sm">&copy;</span></h2>
            </div>
            <table className="flex justify-end items-top gap-2">
                <tbody>
                    <tr className="flex flex-col gap-2 items-center text-black dark:text-white">
                        <th>Products</th>
                        <td><div className="border-b-2 w-4/5 mx-auto" /></td>
                        <td>Event Planner</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr className="flex flex-col gap-2 items-center text-black dark:text-white">
                        <th>About us</th>
                        <td><div className="border-b-2 w-4/5 mx-auto" /></td>
                        <a  href='http://localhost:5173/about#:~:text=functionality%20and%20design.-,Functions,-PlanIt%20Agenda%20provides' style={{ color: 'blue', textDecoration: 'underline'}}>Functions</a>
                        <a href='http://localhost:5173/about#:~:text=and%20attaining%20success.-,The%20Developers,-Zachary%20Cote' style={{ color: 'blue', textDecoration: 'underline'}}>Developers</a>
                        <a href='http://localhost:5173/about#:~:text=ambitions%20a%20reality.-,Purpose,-PlanIt%20Agenda%20provides' style={{ color: 'blue', textDecoration: 'underline'}}>Purpose</a>
                    </tr>
                </tbody>
                <tbody>
                    <tr className="flex flex-col gap-2 text-black dark:text-white">
                        <th>Contact us</th>
                        <td><div className="border-b-2 w-4/5 mx-auto" /></td>
                        <td className="flex items-center gap-2">
                            <img src="assets/house-fill.svg" alt="house icon" className="h-4" />
                                <a href="https://www.ric.edu/" style={{ color: 'blue', textDecoration: 'underline' }}>
                                    Rhode Island College
                                </a>
                        </td>
                        <td className="flex items-center gap-2">
                            <img src="assets/envelope-fill.svg" alt="email icon" className="h-4" />
                                <a href="mailto:planitagenda@googlegroups.com" style={{ color: 'blue', textDecoration: 'underline' }}>
                                planitagenda@googlegroups.com
                                </a>
                        </td>
                        <td className="flex items-center gap-2">
                            <img src="assets/telephone-fill.svg" alt="phone icon" className="h-4" /> 
                                <a href="tel:+4134002860" style={{ color: 'blue', textDecoration: 'underline'}}>
                                    (413) 002-2860
                                </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </footer>
    );
}

export default Footer;