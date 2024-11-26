/**
 * Adds footer information to the bottom of the page
 * 
 * TODO: Refactor the table to stop warning in console
 * @returns feature
 */
function Footer() {
    
    return (
        <footer className="flex bottom-0 w-full bg-300 border-t border-zinc-100 border-opacity-50 p-4">
            <div id="brandFooterContainer" className="flex flex-col flex-1 justify-items-start items-start">
                <img src="/assets/logo.png" alt="logo image" className="w-8 h-8" />
                <h2>PlanIt <span className="text-zinc-500 align-left text-sm">&copy;</span></h2>
            </div>
            <table className="flex justify-end items-top gap-2">
                <tbody>
                    <tr className="flex flex-col gap-2 items-center">
                        <th>Products</th>
                        <td><div className="border-b-2 w-4/5 mx-auto" /></td>
                        <td>Event Planner</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr className="flex flex-col gap-2 items-center">
                        <th>About us</th>
                        <td><div className="border-b-2 w-4/5 mx-auto" /></td>
                        <td>Functions</td>
                        <td>Developers</td>
                        <td>Purpose</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr className="flex flex-col gap-2">
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
                                <a href="mailto:email@email.com" style={{ color: 'blue', textDecoration: 'underline' }}>
                                    email@email.com
                                </a>
                        </td>
                        <td className="flex items-center gap-2">
                            <img src="assets/telephone-fill.svg" alt="phone icon" className="h-4" /> 
                                <a href="tel:+4011234567" style={{ color: 'blue', textDecoration: 'underline'}}>
                                    (401) 123-4567
                                </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </footer>
    );
}

export default Footer;