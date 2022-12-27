import React, { useEffect, useState } from 'react';

const Converter = () => {
	const [inputValue1, setInputValue1] = useState(1);
	const [inputValue2, setInputValue2] = useState(1);
	const [currency1, setCurrency1] = useState('USD');
	const [currency2, setCurrency2] = useState('AZN');
	const [data, setData] = useState([]);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = () => {
		fetch(`https://v6.exchangerate-api.com/v6/4cbccedf10a873bbcd3aea0e/latest/USD`)
			.then((res) => res.json())
			.then((data) => {
				setData(data.conversion_rates);
			});
	};

	useEffect(() => {
		if (!!data) {
			function init() {
				handleInputValue1Change(1);
			}
			init();
		}
	}, [data]);

	function format(number) {
		return number.toFixed(4);
	}

	function handleInputValue1Change(inputValue1) {
		setInputValue2(format((inputValue1 * data[currency2]) / data[currency1]));
		setInputValue1(inputValue1);
	}

	function handleCurrency1Change(currency1) {
		setInputValue2(format((inputValue1 * data[currency2]) / data[currency1]));
		setCurrency1(currency1);
	}

	function handleinputValue2Change(inputValue2) {
		setInputValue1(format((inputValue2 * data[currency1]) / data[currency2]));
		setInputValue2(inputValue2);
	}

	function handleCurrency2Change(currency2) {
		setInputValue2(format((inputValue1 * data[currency2]) / data[currency1]));
		setCurrency2(currency2);
	}

	return (
		<div>
			<h1>Currency Converter</h1>
			<div className="group">
				<input type="number" min={0} value={inputValue1} onChange={(ev) => handleInputValue1Change(ev.target.value)} />
				<select value={currency1} onChange={(ev) => handleCurrency1Change(ev.target.value)}>
					{Object.keys(data).map((currency) => (
						<option key={currency} value={currency}>
							{currency}
						</option>
					))}
				</select>
			</div>
			<div className="number">
				<input type="text" min={0} value={inputValue2} onChange={(ev) => handleinputValue2Change(ev.target.value)} />
				<select value={currency2} onChange={(ev) => handleCurrency2Change(ev.target.value)}>
					{Object.keys(data).map((currency) => (
						<option key={currency} value={currency}>
							{currency}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default Converter;
