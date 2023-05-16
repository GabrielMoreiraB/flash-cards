import { getNewId } from "../services/idService";

export default function TextArea({
  labelDescription = 'Descrição do label:',
  textAreaValue = 'Valor padrão do textArea',
  onTextAreaChange = null,
  id = getNewId(),
  maxLength = 230,
  rows = 4,
}) {
  function handleInputChange({ currentTarget }) {
    if (onTextAreaChange) {
      const newValue = currentTarget.value;
      onTextAreaChange(newValue);
    }
  }

  const currentCharacterArea = textAreaValue.length

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>

      <textarea
        maxLength={maxLength}
        rows={rows}
        id={id}
        className="border p-1"
        type="text"
        value={textAreaValue}
        onChange={handleInputChange}
      />

      <div className="text-right"><span>{currentCharacterArea}/{maxLength}</span></div>
    </div>
  );
}
