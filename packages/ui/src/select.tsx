"use client";
const Select = ({
  onSelect,
  options,
}: {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
}) => {
  return (
    <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      onChange={(e) => onSelect(e.target.value)}
    >
      {options?.map((option) => (
        <option value={option.key}>{option.value}</option>
      ))}
    </select>
  );
};

export default Select;
