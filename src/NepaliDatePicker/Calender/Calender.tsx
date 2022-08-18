import { ADToBS } from 'bikram-sambat-js'
import React, {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  NepaliDatepickerEvents,
  ParsedDate,
  parsedDateInitialValue,
  SplittedDate,
  YearMonth,
} from '../Types'
import { executionDelegation, parseBSDate, stitchDate } from '../Utils/common'
import CalenderController from './components/CalenderController'
import { DayPicker } from './components/DayPicker'

interface CalenderProps {
  value: string
  events: NepaliDatepickerEvents
}

const Calender: FunctionComponent<CalenderProps> = ({ value, events }) => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<ParsedDate>(
    parsedDateInitialValue
  )
  const [calenderDate, setCalenderDate] = useState<ParsedDate>(
    parsedDateInitialValue
  )

  useEffect(() => {
    const parsedDateValue = parseBSDate(value)

    setSelectedDate(parsedDateValue)
    setCalenderDate(parsedDateValue)
    setIsInitialized(true)
  }, [value])

  useEffect(() => {
    if (isInitialized) {
      events.change(
        stitchDate({
          year: selectedDate.bsYear,
          month: selectedDate.bsMonth,
          day: selectedDate.bsDay,
        })
      )
    }
  }, [selectedDate, isInitialized, events])

  const onPreviousMonthHandler = useCallback(() => {
    executionDelegation(
      () => {
        setCalenderDate((date) => {
          let year = date.bsYear
          let month = date.bsMonth - 1

          if (month < 1) {
            month = 12
            year--
          }

          return parseBSDate(
            stitchDate(
              {
                day: date.bsDay,
                month,
                year,
              },
              '-'
            )
          )
        })
      },
      () => {
        if (events.previousMonthSelect) {
          events.previousMonthSelect({
            month: calenderDate.bsMonth,
            year: calenderDate.bsYear,
          })
        }
      }
    )
  }, [calenderDate.bsMonth, calenderDate.bsYear, events])

  const onNextMonthClickHandler = useCallback(() => {
    executionDelegation(
      () => {
        setCalenderDate((date) => {
          let year = date.bsYear
          let month = date.bsMonth + 1

          if (month > 12) {
            month = 1
            year++
          }

          return parseBSDate(
            stitchDate(
              {
                day: date.bsDay,
                month,
                year,
              },
              '-'
            )
          )
        })
      },
      () => {
        if (events.nextMonthSelect) {
          events.nextMonthSelect({
            year: calenderDate.bsYear,
            month: calenderDate.bsMonth,
          })
        }
      }
    )
  }, [calenderDate.bsMonth, calenderDate.bsYear, events])

  const onTodayClickHandler = useCallback(() => {
    const today = parseBSDate(ADToBS(new Date()))

    executionDelegation(
      () => {
        setCalenderDate(today)
        setSelectedDate(today)
      },
      () => {
        if (events.todaySelect) {
          events.todaySelect({
            year: today.bsYear,
            month: today.bsMonth,
            day: today.bsDay,
          })
        }
      }
    )
  }, [events])

  const onYearSelectHandler = useCallback(
    (year: number) => {
      executionDelegation(
        () => {
          setCalenderDate(
            parseBSDate(
              stitchDate({
                year,
                month: calenderDate.bsMonth,
                day: calenderDate.bsDay,
              })
            )
          )
        },
        () => {
          if (events.yearSelect) {
            events.yearSelect(year)
          }
        }
      )
    },
    [calenderDate, events]
  )

  const onMonthSelectHandler = useCallback(
    (month: number | YearMonth) => {
      executionDelegation(
        () => {
          setCalenderDate(
            parseBSDate(
              stitchDate({
                year: calenderDate.bsYear,
                month: month as number,
                day: calenderDate.bsDay,
              })
            )
          )
        },
        () => {
          if (events.monthSelect) {
            events.monthSelect(month as YearMonth)
          }
        }
      )
    },
    [calenderDate, events]
  )

  const onDaySelectHandler = useCallback(
    (date: SplittedDate) => {
      executionDelegation(
        () => {
          const newDate = parseBSDate(stitchDate(date))

          setCalenderDate(newDate)
          setSelectedDate(newDate)
        },
        () => {
          if (events.daySelect) {
            events.daySelect(date)
          }
        }
      )
    },
    [events]
  )

  return (
    <div className='calender'>
      <div className='calendar-wrapper'>
        {isInitialized && (
          <Fragment>
            <CalenderController
              onPreviousMonth={onPreviousMonthHandler}
              onNextMonth={onNextMonthClickHandler}
              calenderDate={calenderDate}
              onToday={onTodayClickHandler}
              onYearSelect={onYearSelectHandler}
              onMonthSelect={onMonthSelectHandler}
            />

            <DayPicker
              selectedDate={selectedDate}
              calenderDate={calenderDate}
              onDaySelect={onDaySelectHandler}
            />
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default Calender
