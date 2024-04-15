import React, { useState, useEffect } from 'react';

function TimeLogList() {
  const getCurrentPayrollStart = () => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDayOfWeek);
    return startOfWeek;
  };

  const [selectedDate, setSelectedDate] = useState(getCurrentPayrollStart());
  const [data, setData] = useState([]);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [newEntry, setNewEntry] = useState({
    name: '', // Add name field
    date: '',
    clockIn: '',
    clockOut: '',
    hoursWorked: '',
    totalHours: '',
    status: 'Pending'
  });

  const [noTimeLogMessage, setNoTimeLogMessage] = useState('');
  const [hoursForSelectedDate, setHoursForSelectedDate] = useState(0);
  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    if (submitClicked) {
      fetchData();
    }
  }, [selectedDate, submitClicked]);

  const fetchData = () => {
    // Fetch time log data for selected date
    // This could be an API call to fetch time logs for the selected date
    const timeLogsForSelectedDate = data.filter(entry => entry.date === selectedDate.toISOString().split('T')[0]);

    setNoTimeLogMessage(timeLogsForSelectedDate.length === 0 ? 'No time log present.' : '');

    let totalHours = 0;
    timeLogsForSelectedDate.forEach(log => {
      totalHours += parseFloat(log.hoursWorked);
    });
    setHoursForSelectedDate(totalHours);
  };

  const handleCellEdit = (newValue, rowIndex, field) => {
    setData(prevData => {
      const updatedData = [...prevData];
      updatedData[rowIndex][field] = newValue;

      if (field === 'clockIn' || field === 'clockOut') {
        // No need to handle time format conversion here
        // Time input handles the format internally
        const clockIn = updatedData[rowIndex].clockIn;
        const clockOut = updatedData[rowIndex].clockOut;

        // Calculate total worked hours
        let totalHours = 0;
        if (clockIn && clockOut) {
          const [hoursIn, minutesIn] = clockIn.split(':').map(Number);
          const [hoursOut, minutesOut] = clockOut.split(':').map(Number);
          totalHours = (hoursOut - hoursIn) + (minutesOut - minutesIn) / 60;
          if (totalHours < 0) totalHours += 24;
        }
        updatedData[rowIndex].hoursWorked = totalHours.toFixed(2);

        // Calculate total worked hours for all entries
        let totalWorkedHours = 0;
        updatedData.forEach(entry => {
          if (!isNaN(entry.hoursWorked)) {
            totalWorkedHours += parseFloat(entry.hoursWorked);
          }
        });
        updatedData[rowIndex].totalHours = totalWorkedHours.toFixed(2);
      }

      return updatedData;
    });
    saveDataToBackend();
  };

  const saveDataToBackend = () => {
    try {
      // Save data to backend
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleEditRow = (rowIndex) => {
    setEditingRowIndex(rowIndex);
  };

  const handleDeleteRow = (rowIndex) => {
    const updatedData = [...data];
    updatedData.splice(rowIndex, 1);
    setData(updatedData);
    saveDataToBackend(updatedData);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddNewEntry = () => {
    const updatedData = [...data, newEntry];
    setData(updatedData);
    saveDataToBackend(updatedData);
    setNewEntry({ // Reset newEntry after adding
      name: '', // Reset name field
      date: '',
      clockIn: '',
      clockOut: '',
      hoursWorked: '',
      totalHours: '',
      status: 'Pending'
    });
  };

  const handleSubmit = () => {
    setSubmitClicked(true);
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
  };

  return (
    <div className="time-log-list-container">
      <h2>Time Log List</h2>
      <div className="calendar-dropdown">
        <label htmlFor="selectedDate">Select Date:</label>
        <input type="date" id="selectedDate" name="selectedDate" value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''} onChange={(e) => handleDateChange(new Date(e.target.value))} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="admin-dashboard-content">
        {noTimeLogMessage && <p>{noTimeLogMessage}</p>}
        {data.length > 0 && (
          <table className="time-log-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Hours Worked</th>
                <th>Total Hours</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{entry.name}</td>
                  <td>
                    {editingRowIndex === rowIndex ? (
                      <input
                        type="date"
                        value={entry.date}
                        onChange={(e) => handleCellEdit(e.target.value, rowIndex, 'date')}
                      />
                    ) : (
                      entry.date
                    )}
                  </td>
                  <td>
                    {editingRowIndex === rowIndex ? (
                      <input
                        type="time"
                        value={entry.clockIn}
                        onChange={(e) => handleCellEdit(e.target.value, rowIndex, 'clockIn')}
                      />
                    ) : (
                      formatTime(entry.clockIn)
                    )}
                  </td>
                  <td>
                    {editingRowIndex === rowIndex ? (
                      <input
                        type="time"
                        value={entry.clockOut}
                        onChange={(e) => handleCellEdit(e.target.value, rowIndex, 'clockOut')}
                      />
                    ) : (
                      formatTime(entry.clockOut)
                    )}
                  </td>
                  <td>{entry.hoursWorked}</td>
                  <td>{entry.totalHours}</td>
                  <td>{entry.status}</td>
                  <td>
                    {editingRowIndex === rowIndex ? (
                      <button onClick={() => setEditingRowIndex(null)}>
                        Save
                      </button>
                    ) : (
                      <>
                        <button onClick={() => handleEditRow(rowIndex)}>Edit</button>
                        <button onClick={() => handleDeleteRow(rowIndex)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div>
          <button onClick={handleAddNewEntry}>
            <span role="img" aria-label="plus-sign">+</span>
          </button>
        </div>
      </div>
      <div className="hours-table">
        <h3>Select</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Hours Worked</th>
              <th>Total Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {submitClicked && data.filter(entry => entry.date === selectedDate.toISOString().split('T')[0]).map((entry, rowIndex) => (
              <tr key={rowIndex}>
                <td>{entry.date}</td>
                <td>{formatTime(entry.clockIn)}</td>
                <td>{formatTime(entry.clockOut)}</td>
                <td>{entry.hoursWorked}</td>
                <td>{entry.totalHours}</td>
                <td>{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {submitClicked && <p>Total Hours: {hoursForSelectedDate}</p>}
      </div>
    </div>
  );
}

export default TimeLogList;
