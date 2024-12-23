import React, { useState } from 'react';
import { User, Save, BarChart2, Cpu, FileText } from 'lucide-react';
import axios from 'axios';

const SalaryPrediction = () => {
  // Define state variables for the player data input
  const [inputData, setInputData] = useState({
    currentAge: 0,
    starts: 0,
    min: 0,
    gls: 0,
    ast: 0,
    crdY: 0,
    soT: 0,
    gSh: 0,
    passAtt: 0,
    cmpPer: 0,
    tklW: 0,
    blocks: 0,
    int: 0,
    dribbleAtt: 0,
    carries: 0,
    targ: 0,
    annualGross: 0,
    pos: 0,
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: parseFloat(value),
    });
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      // Create an array of input data to send in the POST request
      const inputDataArray = Object.values(inputData); // Ensure it's an array of numbers
      console.log("Input data being sent:", inputDataArray);  // Debugging log
  
      const response = await axios.post('http://127.0.0.1:8000/predict', {
        input_data: inputDataArray,  // Send the input data correctly
      });
      
      // Log the response from the server to check the structure
      console.log("Response from server:", response.data);
  
      // Ensure the response has the correct prediction field
      if (response.data.prediction !== undefined) {
        setPrediction(response.data.prediction); // Update prediction if exists
      } else {
        console.error('No prediction data found in the response');
        setPrediction(null);  // Reset prediction if no data
      }
  
    } catch (error) {
      console.error('Error predicting salary:', error);
    } finally {
      setLoading(false);
    }
  };

  // Convert prediction data to CSV
  const convertToCSV = (data: number | null) => {
    const headers = ["Predicted Salary"];
    const rows = [[data ? data.toString() : "N/A"]];
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");
    return csvContent;
  };

  // Trigger the download of the CSV file
  const handleExport = () => {
    const csvData = convertToCSV(prediction);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prediction_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Salary Prediction</h1>
        <button
          onClick={handlePredict}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Save className="w-5 h-5" />
          Predict Salary
        </button>
      </div>

      {/* Input Form for Player Data */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <BarChart2 className="w-6 h-6 text-emerald-600" />
          <h2 className="text-lg font-semibold text-gray-800">Player Stats</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(inputData).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">{key.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="number"
                name={key}
                value={inputData[key as keyof typeof inputData]}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prediction Result */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <Cpu className="w-6 h-6 text-emerald-600" />
          <h2 className="text-lg font-semibold text-gray-800">Prediction Result</h2>
        </div>
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : prediction !== null && prediction !== undefined ? (
          <div className="text-center text-gray-800">
            <p className="text-lg font-medium">Predicted Salary: ${prediction.toLocaleString()}</p>
          </div>
        ) : (
          <div className="text-center text-gray-500">No prediction yet. Enter player data above.</div>
        )}
      </div>

      {/* Security and Data Management */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <FileText className="w-6 h-6 text-emerald-600" />
          <h2 className="text-lg font-semibold text-gray-800">Data Management</h2>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleExport}
            className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            <h3 className="font-medium text-gray-800">Export Prediction Data</h3>
            <p className="text-sm text-gray-500">Download prediction result as CSV</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalaryPrediction;
