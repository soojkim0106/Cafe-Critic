import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { BiLogo99Designs } from 'react-icons/bi';

function TimeLogList() {
  const { postTimeLog, deleteTimeLog, fetchAllTimeLogs, updateTimeLog } = useContext(AuthContext);
  const getCurrentPayrollStart = () => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDayOfWeek);
    return startOfWeek;
  };

  const [selectedDate, setSelectedDate] = useState(getCurrentPayrollStart());
  const [data, setData] = useState([]);
  const [allTimeLogs, setAllTimeLogs] = useState([]);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editLogId, seteditLogId] = useState(null)
  const [newEntry, setNewEntry] = useState({
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
   (fetchAllTimeLogs().then(data => {
    if (data){setAllTimeLogs(data)
    }
      
    }));
  }, [selectedDate, submitClicked]);

 
  const fetchData = () => {
    const timeLogsForSelectedDate = data.filter(entry => entry.date === selectedDate.toISOString().split('T')[0]);
    setNoTimeLogMessage(timeLogsForSelectedDate.length === 0 ? 'No time log present.' : '');
    let totalHours = 0;
    timeLogsForSelectedDate.forEach(log => {
      totalHours += parseFloat(log.hoursWorked);
    });
    setHoursForSelectedDate(totalHours);
  };


  const saveDataToBackend = (updatedData) => {
    // Logic to save data to backend
  };

  const updateDatabase = (logid) => {
    const updatedTimeLog = allTimeLogs.find(log => logid === log.id)
    updateTimeLog(logid, updatedTimeLog)
  };

  const handlePatch = (logid) => {
    seteditLogId(logid);
  }

  const handleEditPatch = (newValue, rowIndex, field, isAllTimeLog) => {
    setAllTimeLogs(prevData => {
      const updatedData = [...prevData];
      updatedData[rowIndex][field] = newValue;
      if (!isAllTimeLog) {
        if (field === 'clockIn' || field === 'clockOut') {
          const clockIn = updatedData[rowIndex].clockIn;
          const clockOut = updatedData[rowIndex].clockOut;
          let totalHours = 0;
          if (clockIn && clockOut) {
            const [hoursIn, minutesIn] = clockIn.split(':').map(Number);
            const [hoursOut, minutesOut] = clockOut.split(':').map(Number);
            totalHours = (hoursOut - hoursIn) + (minutesOut - minutesIn) / 60;
            if (totalHours < 0) totalHours += 24;
          }
          updatedData[rowIndex].hoursWorked = totalHours.toFixed(2);
          let totalWorkedHours = 0;
          updatedData.forEach(entry => {
            if (!isNaN(entry.hoursWorked)) {
              totalWorkedHours += parseFloat(entry.hoursWorked);
            }
          });
          updatedData[rowIndex].totalHours = totalWorkedHours.toFixed(2);
        }
        // updatedTimeLog(updatedData[rowIndex].id, updatedData);
      }
      return updatedData;
    });
  }
  const handleCellEdit = (newValue, rowIndex, field, isAllTimeLog) => {
    setData(prevData => {
      const updatedData = [...prevData];
      updatedData[rowIndex][field] = newValue;
      if (!isAllTimeLog) {
        if (field === 'clockIn' || field === 'clockOut') {
          const clockIn = updatedData[rowIndex].clockIn;
          const clockOut = updatedData[rowIndex].clockOut;
          let totalHours = 0;
          if (clockIn && clockOut) {
            const [hoursIn, minutesIn] = clockIn.split(':').map(Number);
            const [hoursOut, minutesOut] = clockOut.split(':').map(Number);
            totalHours = (hoursOut - hoursIn) + (minutesOut - minutesIn) / 60;
            if (totalHours < 0) totalHours += 24;
          }
          updatedData[rowIndex].hoursWorked = totalHours.toFixed(2);
          let totalWorkedHours = 0;
          updatedData.forEach(entry => {
            if (!isNaN(entry.hoursWorked)) {
              totalWorkedHours += parseFloat(entry.hoursWorked);
            }
          });
          updatedData[rowIndex].totalHours = totalWorkedHours.toFixed(2);
        }
        saveDataToBackend(updatedData);
      }
      return updatedData;
    });
  };

  

  const handleSaveSubmit = () => {
    setEditingRowIndex(null);
    postTimeLog(data).then(log => console.log(log));
  };

  const handleEditRow = (rowIndex) => {
    setEditingRowIndex(rowIndex);
  };
  
 
  const handleDeleteRow =  (timeLogId) => {
    
   
    try {
      // Call deleteTimeLog with the time log id and await the deletion
       deleteTimeLog(timeLogId);
  
      // If the deletion was successful, update the frontend state
      // setAllTimeLogs(prevData => {
      //   const updatedData = [...prevData];
      //   updatedData.splice(rowIndex, 1);
      //   return updatedData;
      // });
      setAllTimeLogs(prevData => {
        const updatedData = prevData.filter(log => log.id !== timeLogId)
        return updatedData;
      });
    } catch (error) {
      console.error('Error deleting time log:', error);
      // Handle error if necessary
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddNewEntry = () => {
    const updatedData = [...data, newEntry];
    setData(updatedData);
    saveDataToBackend(updatedData);
    setNewEntry({
      date: '',
      clockIn: '',
      clockOut: '',
      hoursWorked: '',
      totalHours: '',
      status: 'Pending'
    });
  };
  console.log(allTimeLogs)
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
                  <td>
                    {editingRowIndex === rowIndex ? (
                      <input
                        type="date"
                        value={entry.date}
                        onChange={(e) => handleCellEdit(e.target.value, rowIndex, 'date', false)}
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
                        onChange={(e) => handleCellEdit(e.target.value, rowIndex, 'clockIn', false)}
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
                        onChange={(e) => handleCellEdit(e.target.value, rowIndex, 'clockOut', false)}
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
                      <button onClick={() => handleSaveSubmit()}>
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
        <h3>All Time Logs</h3>
        <table>
          <thead>
            <tr>
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
            {allTimeLogs.map((log, index) => (
              <tr key={index}>
                <td>
                  {editLogId === log.id ? (
                      <input
                        type="date"
                        value={log.date}
                        onChange={(e) => handleEditPatch(e.target.value, index, 'date', false)}
                      />
                    ) : (log.date)} 
                  </td>
                <td>
                  {editLogId === log.id ? (
                      <input
                        type="time"
                        value={log.clockIn}
                        onChange={(e) => handleEditPatch(e.target.value, index, 'clockIn', false)}
                      />
                    ) : (formatTime(log.clock_in))}
                  </td>
                <td>
                  {editLogId === log.id ? (
                      <input
                        type="time"
                        value={log.clockOut}
                        onChange={(e) => handleEditPatch(e.target.value, index, 'clockOut', false)}
                      />
                    ) : (formatTime(log.clock_out))}
                  </td>
                <td>{log.hours_worked}</td>
                <td>{log.total_hours}</td>
                <td>{log.status}</td>
                <td>
                  {editLogId === log.id ? (
                  <button onClick= {() => updateDatabase(log.id)}>Update</button>
                  ):(
                  <>
                  <button onClick= {() => handlePatch(log.id)}>Edit</button>
                  <button onClick={() => handleDeleteRow(log.id)}>Delete</button>
                  </>
                  )}
                  
      
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TimeLogList;
