import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { space, layout, typography, color } from 'styled-system';

// Styled Components (unchanged)
const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  ${space}
  ${layout}
`;

const FormField = styled.div`
  margin-bottom: 24px;
  ${space}
  ${typography}
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  ${typography}
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
  ${space}
  ${typography}
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
  ${space}
  ${typography}
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
  ${space}
  ${typography}
`;

const Button = styled.button`
  background: #007bff;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
  
  &:hover {
    background: #0056b3;
  }
  ${space}
  ${typography}
`;

const DisplayWrapper = styled.div`
  margin-top: 40px;
`;

const DataList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const DataItem = styled.li`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
`;

const PharmacyForm = () => {
  const [medicineName, setMedicineName] = useState('');
  const [medicineDescription, setMedicineDescription] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [medicineId, setMedicineId] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [tabletType, setTabletType] = useState('pk');
  const [tabletDefault, setTabletDefault] = useState('Default');
  const [tabletNumber, setTabletNumber] = useState('');
  const [soldIn, setSoldIn] = useState('pk');
  const [stripPerPk, setStripPerPk] = useState('');
  const [tabletsPerStrip, setTabletsPerStrip] = useState('');
  const [formData, setFormData] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    // Generate a unique Medicine ID
    setMedicineId(`MED${new Date().getTime()}`);
  }, []);

  useEffect(() => {
    // Reset price and tablet-related fields when unit changes
    if (unit === 'tablet') {
      setTabletType('pk');
      setTabletDefault('Default');
      setTabletNumber('');
      setPrice('');
    } else {
      setTabletType('');
      setTabletDefault('');
      setTabletNumber('');
      setStripPerPk('');
      setTabletsPerStrip('');
    }
  }, [unit]);

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handleSoldInChange = (e) => {
    setSoldIn(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let displayPrice = parseFloat(price) || 0;
    let alternativePrice = 0;
  let alternativePrice2 = 0;
    // Calculate alternative price based on soldIn type
    if (unit === 'tablet') {
      if (soldIn === 'strip') {
        alternativePrice = displayPrice * parseFloat(stripPerPk) || 0;
      } else if (soldIn === 'tablet') {
        alternativePrice = displayPrice * parseFloat(tabletsPerStrip) * parseFloat(stripPerPk) || 0;
        alternativePrice2 = displayPrice * parseFloat(stripPerPk) || 0;
      }
    } else if (unit === 'strip') {
      alternativePrice = displayPrice * parseFloat(stripPerPk) || 0;
    }
  
    // Collect the form data with calculated prices
    const newFormData = {
      medicineName,
      medicineDescription,
      batchNumber,
      medicineId,
      unit,
      price: displayPrice.toFixed(2),
      alternativePrice: alternativePrice.toFixed(2),
      alternativePrice2: alternativePrice2.toFixed(2),
      tabletType,
      tabletDefault,
      tabletNumber,
      soldIn,
      stripPerPk,
      tabletsPerStrip,
    };
  
    // Add the new data to the formData array
    setFormData([...formData, newFormData]);
  
    // Clear the form after submission
    setMedicineName('');
    setMedicineDescription('');
    setBatchNumber('');
    setPrice('');
    setUnit('');
    setSoldIn('pk');
    setStripPerPk('');
    setTabletsPerStrip('');
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="medicineName">Medicine Name:</Label>
          <Input
            type="text"
            id="medicineName"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor="medicineDescription">Medicine Description:</Label>
          <TextArea
            id="medicineDescription"
            value={medicineDescription}
            onChange={(e) => setMedicineDescription(e.target.value)}
            required
            rows="4"
          />
        </FormField>

        <FormField>
          <Label htmlFor="batchNumber">Batch Number:</Label>
          <Input
            type="text"
            id="batchNumber"
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
            required
          />
        </FormField>

        <FormField>
          <Label htmlFor="medicineId">Medicine ID:</Label>
          <Input
            type="text"
            id="medicineId"
            value={medicineId}
            readOnly
          />
        </FormField>

        <FormField>
          <Label htmlFor="unit">Unit:</Label>
          <Select
            id="unit"
            value={unit}
            onChange={handleUnitChange}
            required
          >
            <option value="">Select Unit</option>
            <option value="tube">Tube</option>
            <option value="amp">Amp</option>
            <option value="tablet">Tablet</option>
            <option value="bottle">Bottle</option>
            <option value="cerep">Cerep</option>
          </Select>
        </FormField>

        {(unit === 'tube' || unit === 'amp' || unit === 'bottle') && (
          <FormField>
            <Label htmlFor="price">Price:</Label>
            <Input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </FormField>
        )}

        {unit === 'tablet' && (
          <>
            <FormField>
              <Label htmlFor="price">Price:</Label>
              <Input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </FormField>

            <FormField>
              <Label htmlFor="soldIn">Sold In:</Label>
              <Select
                id="soldIn"
                value={soldIn}
                onChange={handleSoldInChange}
              >
                <option value="pk">PK</option>
                <option value="strip">Strip</option>
                <option value="tablet">Tablet</option>
              </Select>
            </FormField>

            {soldIn === 'strip' && (
              <FormField>
                <Label htmlFor="stripPerPk">Strips per PK:</Label>
                <Input
                  type="number"
                  id="stripPerPk"
                  value={stripPerPk}
                  onChange={(e) => setStripPerPk(e.target.value)}
                  required
                />
              </FormField>
            )}

            {soldIn === 'tablet' && (
              <>
                <FormField>
                  <Label htmlFor="tabletsPerStrip">Tablets per Strip:</Label>
                  <Input
                    type="number"
                    id="tabletsPerStrip"
                    value={tabletsPerStrip}
                    onChange={(e) => setTabletsPerStrip(e.target.value)}
                    required
                  />
                </FormField>

                <FormField>
                  <Label htmlFor="stripPerPk">Strips per PK:</Label>
                  <Input
                    type="number"
                    id="stripPerPk"
                    value={stripPerPk}
                    onChange={(e) => setStripPerPk(e.target.value)}
                    required
                  />
                </FormField>
              </>
            )}
          </>
        )}

        <FormField>
          <Label htmlFor="totalQuantity">Total Quantity:</Label>
          <Input
            type="number"
            id="totalQuantity"
            value={totalQuantity}
            onChange={(e) => setTotalQuantity(e.target.value)}
            required
          />
        </FormField>

        <Button type="submit">Submit</Button>
      </form>

      <DisplayWrapper>
        <h2>Submitted Data:</h2>
        <DataList>
          {formData.map((data, index) => (
            <DataItem key={index}>
              <strong>Medicine Name:</strong> {data.medicineName}<br />
              <strong>Description:</strong> {data.medicineDescription}<br />
              <strong>Batch Number:</strong> {data.batchNumber}<br />
              <strong>Medicine ID:</strong> {data.medicineId}<br />
              <strong>Unit:</strong> {data.unit}<br />
              <strong>Price:</strong> {data.price}<br />
              <strong>Alternative Price:</strong> {data.alternativePrice}<br />
              <strong>Alternative Price:</strong> {data.alternativePrice2}<br />
              <strong>Tablet Type:</strong> {data.tabletType}<br />
              <strong>Tablet Default:</strong> {data.tabletDefault}<br />
              <strong>Tablet Number:</strong> {data.tabletNumber}<br />
              <strong>Sold In:</strong> {data.soldIn}<br />
              {data.soldIn === 'strip' && (
                <>
                  <strong>Strips per PK:</strong> {data.stripPerPk}<br />
                </>
              )}
              {data.soldIn === 'tablet' && (
                <>
                  <strong>Tablets per Strip:</strong> {data.tabletsPerStrip}<br />
                  <strong>Strips per PK:</strong> {data.stripPerPk}<br />
                </>
              )}
            </DataItem>
          ))}
        </DataList>
      </DisplayWrapper>
    </FormWrapper>
  );
};

export default PharmacyForm;
