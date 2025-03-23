import {
  Select,
  Label,
  Button,
  Popover,
  ListBox,
  ListBoxItem,
} from 'react-aria-components';

function RegionSelect({ selectedKey, onSelectionChange, regions }) {
  return (
    <Select
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
      className="text-200 md:text-300"
    >
      <Label className="sr-only">Filter by region</Label>

      <Button className="group dark:bg-dark-blue flex min-w-[12.5rem] cursor-pointer items-center justify-between rounded-[5px] bg-white px-6 py-4 shadow-(--shadow-two) data-focus-visible:outline-2 data-focus-visible:-outline-offset-2 data-focus-visible:outline-blue-500">
        <>
          <span className="truncate">{selectedKey || 'Filter by Region'}</span>
          <span
            className="transition-transform duration-200 group-aria-expanded:rotate-180"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="h-3 w-3 stroke-current stroke-3"
              fill="none"
              strokeLinecap="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M3 7l7 7 7-7" />
            </svg>
          </span>
        </>
      </Button>

      <Popover>
        <ListBox className="dark:bg-dark-blue text-200 min-w-[12.5rem] rounded-[5px] bg-white shadow-(--shadow-two)">
          {selectedKey && (
            <ListBoxItem
              className="data-focused:bg-very-dark-blue-l data-pressed:bg-very-dark-blue-l dark:data-focused:text-very-dark-blue-l dark:data-pressed:text-very-dark-blue-l cursor-pointer rounded-[5px] px-6 py-2 data-focused:text-white data-pressed:text-white dark:text-white dark:data-focused:bg-white dark:data-pressed:bg-white"
              id=""
            >
              Filter by Region
            </ListBoxItem>
          )}
          {regions
            .filter((region) => region !== selectedKey)
            .map((region) => (
              <ListBoxItem
                className="data-focused:bg-very-dark-blue-l data-pressed:bg-very-dark-blue-l dark:data-focused:text-very-dark-blue-l dark:data-pressed:text-very-dark-blue-l cursor-pointer rounded-[5px] px-6 py-2 data-focused:text-white data-pressed:text-white dark:text-white dark:data-focused:bg-white dark:data-pressed:bg-white"
                key={region}
                id={region}
              >
                {region}
              </ListBoxItem>
            ))}
        </ListBox>
      </Popover>
    </Select>
  );
}

export default RegionSelect;
