## Install

```bash
npm install --save @prasiddha/nepali-datepicker

or,

yarn add @prasiddha/nepali-datepicker
```

## Usage

```tsx
import React, { useState } from 'react';
import { NepaliDatePicker } from '@prasiddha/nepali-datepicker';

const App = () => {
  const [date, setDate] = useState<string>('');

  return (
    <form>
      <label htmlFor="date">Date</label>
      <NepaliDatePicker
        inputClassName="form-control"
        className=""
        value={date}
        onChange={(value: string) => setDate(value)}
        options={{ calenderLocale: 'ne', valueLocale: 'en' }}
      />
    </form>
  );
};

export default App;
```
