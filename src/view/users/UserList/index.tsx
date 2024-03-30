import Table from "@/components/Table";
import { useCustomOutletContext } from "..";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/search";

export default function UserList() {
    const { showedData, handleFilterByName, handleRemoveFilter, handleFilterByRole } = useCustomOutletContext()
    const navigate = useNavigate();

    return (
        <div className="flex column ">
            <section className='search flex align-center padding'>
                <div className="flex align-center column">
                    <SearchBar placeHolder='type a name or part to find all matches' search={handleFilterByName} button={{ title: "View All Users", onClick: handleRemoveFilter }} />
                    <div>
                        <button type='button' onClick={() => handleFilterByRole('user')}>Users</button>
                        <button type='button' onClick={() => handleFilterByRole('student')}>Students</button>
                        <button type='button' onClick={() => handleFilterByRole('teacher')}>Teachers</button>
                    </div>
                </div>
            </section>
            <Table data={showedData} />
            <div>
                <button type="button" onClick={() => navigate('/users/register')}>Register</button>
            </div>

        </div>
    )
}