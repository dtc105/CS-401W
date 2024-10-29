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
                        <td>Functions</td>
                        <td>Developers</td>
                        <td>Purpose</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr className="flex flex-col gap-2 text-black dark:text-white">
                        <th>Contact us</th>
                        <td><div className="border-b-2 w-4/5 mx-auto" /></td>
                        <td className="flex justify-start items-center"><img src="assets/house-fill.svg" alt="house icon" className="h-4 mx-2" /> Rhode Island College</td>
                        <td className="flex justify-start items-center"><img src="assets/envelope-fill.svg" alt="email icon" className="h-4 mx-2" /> email@email.com</td>
                        <td className="flex justify-start items-center"><img src="assets/telephone-fill.svg" alt="phone icon" className="h-4 mx-2" /> (401) 123-4567</td>
                    </tr>
                </tbody>
            </table>
        </footer>
    );
}

export default Footer;