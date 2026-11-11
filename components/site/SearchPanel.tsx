
'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import {
  Search,
  Plane,
  Hotel,
  Car,
  Stamp,
  Loader2,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

type TabId = 'visa' | 'flights' | 'hotels' | 'cars';

type SearchFields = Record<TabId, Record<string, string>>;

type MockResult = {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  price: string;
};

type Errors = Record<string, string>;

const initialFields: SearchFields = {
  visa: {
    nationality: '',
    destination: '',
    travelDate: '',
    passport: '',
  },
  flights: {
    from: '',
    to: '',
    depart: '',
    return: '',
    passengers: '1',
  },
  hotels: {
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
  },
  cars: {
    pickup: '',
    pickupDate: '',
    dropoff: '',
    dropoffDate: '',
    carType: 'compact',
  },
};

const tabs = [
  { id: 'visa', label: 'Visa Services', icon: Stamp },
  { id: 'flights', label: 'Flights', icon: Plane },
  { id: 'hotels', label: 'Hotels', icon: Hotel },
  { id: 'cars', label: 'Car Rental', icon: Car },
] as const;

function localDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function validateRequired(value: string, label: string) {
  return value.trim() ? '' : `${label} is required.`;
}

function validateDate(value: string, label: string) {
  if (!value) return `${label} is required.`;

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return `Please enter a valid ${label.toLowerCase()}.`;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (date < today) {
    return `${label} cannot be in the past.`;
  }

  return '';
}

function getSearchSummary(tab: TabId, fields: Record<string, string>) {
  switch (tab) {
    case 'visa':
      return `${fields.nationality} passport · ${fields.destination} · Travel date: ${fields.travelDate}`;

    case 'flights':
      return `${fields.from} → ${fields.to} · ${fields.depart} · ${fields.passengers} passenger(s)`;

    case 'hotels':
      return `${fields.destination} · ${fields.checkIn} to ${fields.checkOut} · ${fields.guests} guest(s)`;

    case 'cars':
      return `${fields.pickup} → ${fields.dropoff} · ${fields.pickupDate} to ${fields.dropoffDate} · ${fields.carType}`;
  }
}

function createMockResults(
  tab: TabId,
  fields: Record<string, string>
): MockResult[] {
  switch (tab) {
    case 'visa':
      return [
        {
          id: 'visa-standard',
          title: `${fields.destination} Tourist Visa`,
          subtitle: 'Standard application assistance',
          meta: `Nationality: ${fields.nationality} · Travel: ${fields.travelDate}`,
          price: '$120',
        },
        {
          id: 'visa-priority',
          title: `${fields.destination} Priority Assistance`,
          subtitle: 'Priority document review and application guidance',
          meta: 'Illustrative processing estimate · Subject to embassy rules',
          price: '$245',
        },
        {
          id: 'visa-guidance',
          title: 'Visa Documentation Consultation',
          subtitle: 'Personalised document checklist and application guidance',
          meta: 'Consultation-based assistance',
          price: '$80',
        },
      ];

    case 'flights':
      return [
        {
          id: 'flight-economy',
          title: 'Northstar Airways · Economy',
          subtitle: `${fields.from} to ${fields.to} · 1 stop · 14h 20m`,
          meta: `${fields.depart} · ${fields.passengers} passenger(s)`,
          price: '$612',
        },
        {
          id: 'flight-premium',
          title: 'Meridian Air · Premium',
          subtitle: `${fields.from} to ${fields.to} · Nonstop · 9h 45m`,
          meta: 'Flexible fare · Cabin baggage included',
          price: '$1,180',
        },
        {
          id: 'flight-business',
          title: 'Aster Airlines · Business',
          subtitle: `${fields.from} to ${fields.to} · Nonstop`,
          meta: 'Business cabin · Priority boarding',
          price: '$2,640',
        },
      ];

    case 'hotels':
      return [
        {
          id: 'hotel-boutique',
          title: 'Casa Serena Boutique Hotel',
          subtitle: `Premium accommodation in ${fields.destination}`,
          meta: `${fields.checkIn} to ${fields.checkOut} · ${fields.guests} guest(s) · Breakfast`,
          price: '$184/night',
        },
        {
          id: 'hotel-resort',
          title: 'The Grand Marina Resort',
          subtitle: `Luxury resort in ${fields.destination}`,
          meta: 'Swimming pool · Spa · Restaurant',
          price: '$320/night',
        },
        {
          id: 'hotel-comfort',
          title: 'The Traveller’s Residence',
          subtitle: `Comfort stay in ${fields.destination}`,
          meta: 'City centre · Free Wi-Fi',
          price: '$96/night',
        },
      ];

    case 'cars':
      return [
        {
          id: 'car-compact',
          title: 'Toyota Corolla or similar',
          subtitle: 'Compact · 5 seats · 2 bags',
          meta: `${fields.pickup} to ${fields.dropoff} · ${fields.pickupDate} to ${fields.dropoffDate}`,
          price: '$42/day',
        },
        {
          id: 'car-suv',
          title: 'Hyundai Tucson or similar',
          subtitle: 'SUV · 5 seats · Automatic',
          meta: 'Full insurance option · Air conditioning',
          price: '$68/day',
        },
        {
          id: 'car-luxury',
          title: 'BMW 5 Series or similar',
          subtitle: 'Luxury · Automatic · 5 seats',
          meta: 'Premium vehicle category',
          price: '$145/day',
        },
      ];
  }
}

export function SearchPanel() {
  const [tab, setTab] = useState<TabId>('visa');
  const [fields, setFields] = useState<SearchFields>(initialFields);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const [results, setResults] = useState<MockResult[]>([]);
  const [summary, setSummary] = useState('');
  const [selectedResult, setSelectedResult] = useState<MockResult | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const today = localDateString(new Date());
  const activeFields = fields[tab];

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const updateField = (key: string, value: string) => {
    setFields((previous) => ({
      ...previous,
      [tab]: {
        ...previous[tab],
        [key]: value,
      },
    }));

    setErrors((previous) => ({
      ...previous,
      [key]: '',
    }));

    setSelectedResult(null);
  };

  const validateTab = (currentTab: TabId) => {
    const current = fields[currentTab];
    const nextErrors: Errors = {};

    if (currentTab === 'visa') {
      nextErrors.nationality = validateRequired(
        current.nationality,
        'Nationality'
      );

      nextErrors.destination = validateRequired(
        current.destination,
        'Destination country'
      );

      nextErrors.travelDate = validateDate(
        current.travelDate,
        'Travel date'
      );

      if (!current.passport.trim()) {
        nextErrors.passport = 'Passport number is required.';
      } else if (current.passport.trim().length < 6) {
        nextErrors.passport = 'Please enter a valid sample passport number.';
      }
    }

    if (currentTab === 'flights') {
      nextErrors.from = validateRequired(current.from, 'Departure city');
      nextErrors.to = validateRequired(current.to, 'Destination city');
      nextErrors.depart = validateDate(current.depart, 'Departure date');

      if (
        current.from.trim() &&
        current.to.trim() &&
        current.from.trim().toLowerCase() === current.to.trim().toLowerCase()
      ) {
        nextErrors.to = 'Departure and destination cities must be different.';
      }

      if (current.return) {
        nextErrors.return = validateDate(current.return, 'Return date');

        if (current.depart && current.return < current.depart) {
          nextErrors.return = 'Return date cannot be before departure.';
        }
      }
    }

    if (currentTab === 'hotels') {
      nextErrors.destination = validateRequired(
        current.destination,
        'Destination'
      );

      nextErrors.checkIn = validateDate(current.checkIn, 'Check-in date');
      nextErrors.checkOut = validateDate(current.checkOut, 'Check-out date');

      if (
        current.checkIn &&
        current.checkOut &&
        current.checkOut <= current.checkIn
      ) {
        nextErrors.checkOut = 'Check-out must be after check-in.';
      }
    }

    if (currentTab === 'cars') {
      nextErrors.pickup = validateRequired(
        current.pickup,
        'Pick-up location'
      );

      nextErrors.dropoff = validateRequired(
        current.dropoff,
        'Drop-off location'
      );

      nextErrors.pickupDate = validateDate(
        current.pickupDate,
        'Pick-up date'
      );

      nextErrors.dropoffDate = validateDate(
        current.dropoffDate,
        'Drop-off date'
      );

      if (
        current.pickupDate &&
        current.dropoffDate &&
        current.dropoffDate <= current.pickupDate
      ) {
        nextErrors.dropoffDate = 'Drop-off must be after pick-up.';
      }
    }

    setErrors(nextErrors);

    return Object.values(nextErrors).every((error) => !error);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === 'loading' || !validateTab(tab)) return;

    const currentFields = { ...fields[tab] };

    setStatus('loading');
    setSelectedResult(null);

    timerRef.current = setTimeout(() => {
      setSummary(getSearchSummary(tab, currentFields));
      setResults(createMockResults(tab, currentFields));
      setStatus('done');
      timerRef.current = null;
    }, 650);
  };

  const switchTab = (value: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setTab(value as TabId);
    setErrors({});
    setStatus('idle');
    setResults([]);
    setSelectedResult(null);
  };

  const editSearch = () => {
    setStatus('idle');
    setSelectedResult(null);
    setErrors({});
  };

  return (
    <div className="w-full rounded-2xl border border-forest/10 bg-card/95 p-4 shadow-float backdrop-blur-sm sm:p-6">
      <Tabs value={tab} onValueChange={switchTab}>
        <TabsList
          aria-label="Travel search services"
          className="grid h-auto w-full grid-cols-2 gap-1 rounded-xl bg-forest/5 p-1.5 sm:grid-cols-4"
        >
          {tabs.map((item) => {
            const Icon = item.icon;

            return (
              <TabsTrigger
                key={item.id}
                value={item.id}
                className="flex items-center justify-center gap-2 rounded-lg px-2 py-3 text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-forest data-[state=active]:shadow-soft sm:text-sm"
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {status === 'done' ? (
          <ResultsView
            tab={tab}
            summary={summary}
            results={results}
            selectedResult={selectedResult}
            onSelect={setSelectedResult}
            onEdit={editSearch}
          />
        ) : (
          <form onSubmit={handleSubmit} noValidate className="pt-5">
            <TabsContent
              value="visa"
              className="mt-0 focus-visible:outline-none data-[state=inactive]:hidden"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Nationality" htmlFor="visa-nationality" error={errors.nationality}>
                  <Input
                    id="visa-nationality"
                    placeholder="e.g. Pakistani"
                    value={activeFields.nationality}
                    onChange={(e) => updateField('nationality', e.target.value)}
                    aria-invalid={!!errors.nationality}
                    aria-describedby={errors.nationality ? 'visa-nationality-error' : undefined}
                  />
                </Field>

                <Field label="Destination country" htmlFor="visa-destination" error={errors.destination}>
                  <Input
                    id="visa-destination"
                    placeholder="e.g. Greece"
                    value={activeFields.destination}
                    onChange={(e) => updateField('destination', e.target.value)}
                    aria-invalid={!!errors.destination}
                    aria-describedby={errors.destination ? 'visa-destination-error' : undefined}
                  />
                </Field>

                <Field label="Intended travel date" htmlFor="visa-date" error={errors.travelDate}>
                  <Input
                    id="visa-date"
                    type="date"
                    min={today}
                    value={activeFields.travelDate}
                    onChange={(e) => updateField('travelDate', e.target.value)}
                    aria-invalid={!!errors.travelDate}
                    aria-describedby={errors.travelDate ? 'visa-date-error' : undefined}
                  />
                </Field>

                <Field label="Sample passport number" htmlFor="visa-passport" error={errors.passport}>
                  <Input
                    id="visa-passport"
                    placeholder="e.g. AB123456"
                    autoComplete="off"
                    value={activeFields.passport}
                    onChange={(e) => updateField('passport', e.target.value)}
                    aria-invalid={!!errors.passport}
                    aria-describedby={errors.passport ? 'visa-passport-error' : undefined}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Use sample information only. Do not enter real passport details.
                  </p>
                </Field>
              </div>
            </TabsContent>

            <TabsContent
              value="flights"
              className="mt-0 focus-visible:outline-none data-[state=inactive]:hidden"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="From" htmlFor="flight-from" error={errors.from}>
                  <Input
                    id="flight-from"
                    placeholder="City or airport"
                    value={activeFields.from}
                    onChange={(e) => updateField('from', e.target.value)}
                    aria-invalid={!!errors.from}
                    aria-describedby={errors.from ? 'flight-from-error' : undefined}
                  />
                </Field>

                <Field label="To" htmlFor="flight-to" error={errors.to}>
                  <Input
                    id="flight-to"
                    placeholder="City or airport"
                    value={activeFields.to}
                    onChange={(e) => updateField('to', e.target.value)}
                    aria-invalid={!!errors.to}
                    aria-describedby={errors.to ? 'flight-to-error' : undefined}
                  />
                </Field>

                <Field label="Passengers" htmlFor="flight-pax">
                  <Select
                    value={activeFields.passengers}
                    onValueChange={(value) => updateField('passengers', value)}
                  >
                    <SelectTrigger id="flight-pax">
                      <SelectValue placeholder="Passengers" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((number) => (
                        <SelectItem key={number} value={String(number)}>
                          {number} {number === 1 ? 'passenger' : 'passengers'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Departure date" htmlFor="flight-depart" error={errors.depart}>
                  <Input
                    id="flight-depart"
                    type="date"
                    min={today}
                    value={activeFields.depart}
                    onChange={(e) => updateField('depart', e.target.value)}
                    aria-invalid={!!errors.depart}
                    aria-describedby={errors.depart ? 'flight-depart-error' : undefined}
                  />
                </Field>

                <Field label="Return date (optional)" htmlFor="flight-return" error={errors.return}>
                  <Input
                    id="flight-return"
                    type="date"
                    min={activeFields.depart || today}
                    value={activeFields.return}
                    onChange={(e) => updateField('return', e.target.value)}
                    aria-invalid={!!errors.return}
                    aria-describedby={errors.return ? 'flight-return-error' : undefined}
                  />
                </Field>
              </div>
            </TabsContent>

            <TabsContent
              value="hotels"
              className="mt-0 focus-visible:outline-none data-[state=inactive]:hidden"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Destination" htmlFor="hotel-destination" error={errors.destination}>
                  <Input
                    id="hotel-destination"
                    placeholder="City or destination"
                    value={activeFields.destination}
                    onChange={(e) => updateField('destination', e.target.value)}
                    aria-invalid={!!errors.destination}
                    aria-describedby={errors.destination ? 'hotel-destination-error' : undefined}
                  />
                </Field>

                <Field label="Guests" htmlFor="hotel-guests">
                  <Select
                    value={activeFields.guests}
                    onValueChange={(value) => updateField('guests', value)}
                  >
                    <SelectTrigger id="hotel-guests">
                      <SelectValue placeholder="Guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((number) => (
                        <SelectItem key={number} value={String(number)}>
                          {number} {number === 1 ? 'guest' : 'guests'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Check-in" htmlFor="hotel-checkin" error={errors.checkIn}>
                  <Input
                    id="hotel-checkin"
                    type="date"
                    min={today}
                    value={activeFields.checkIn}
                    onChange={(e) => updateField('checkIn', e.target.value)}
                    aria-invalid={!!errors.checkIn}
                    aria-describedby={errors.checkIn ? 'hotel-checkin-error' : undefined}
                  />
                </Field>

                <Field label="Check-out" htmlFor="hotel-checkout" error={errors.checkOut}>
                  <Input
                    id="hotel-checkout"
                    type="date"
                    min={activeFields.checkIn || today}
                    value={activeFields.checkOut}
                    onChange={(e) => updateField('checkOut', e.target.value)}
                    aria-invalid={!!errors.checkOut}
                    aria-describedby={errors.checkOut ? 'hotel-checkout-error' : undefined}
                  />
                </Field>
              </div>
            </TabsContent>

            <TabsContent
              value="cars"
              className="mt-0 focus-visible:outline-none data-[state=inactive]:hidden"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Pick-up location" htmlFor="car-pickup" error={errors.pickup}>
                  <Input
                    id="car-pickup"
                    placeholder="City or airport"
                    value={activeFields.pickup}
                    onChange={(e) => updateField('pickup', e.target.value)}
                    aria-invalid={!!errors.pickup}
                    aria-describedby={errors.pickup ? 'car-pickup-error' : undefined}
                  />
                </Field>

                <Field label="Drop-off location" htmlFor="car-dropoff" error={errors.dropoff}>
                  <Input
                    id="car-dropoff"
                    placeholder="City or airport"
                    value={activeFields.dropoff}
                    onChange={(e) => updateField('dropoff', e.target.value)}
                    aria-invalid={!!errors.dropoff}
                    aria-describedby={errors.dropoff ? 'car-dropoff-error' : undefined}
                  />
                </Field>

                <Field label="Car type" htmlFor="car-type">
                  <Select
                    value={activeFields.carType}
                    onValueChange={(value) => updateField('carType', value)}
                  >
                    <SelectTrigger id="car-type">
                      <SelectValue placeholder="Car type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Pick-up date" htmlFor="car-pickup-date" error={errors.pickupDate}>
                  <Input
                    id="car-pickup-date"
                    type="date"
                    min={today}
                    value={activeFields.pickupDate}
                    onChange={(e) => updateField('pickupDate', e.target.value)}
                    aria-invalid={!!errors.pickupDate}
                    aria-describedby={errors.pickupDate ? 'car-pickup-date-error' : undefined}
                  />
                </Field>

                <Field label="Drop-off date" htmlFor="car-dropoff-date" error={errors.dropoffDate}>
                  <Input
                    id="car-dropoff-date"
                    type="date"
                    min={activeFields.pickupDate || today}
                    value={activeFields.dropoffDate}
                    onChange={(e) => updateField('dropoffDate', e.target.value)}
                    aria-invalid={!!errors.dropoffDate}
                    aria-describedby={errors.dropoffDate ? 'car-dropoff-date-error' : undefined}
                  />
                </Field>
              </div>
            </TabsContent>

            <div className="mt-6 flex flex-col gap-3 border-t border-forest/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                Demo search only. No booking or payment is processed.
              </p>

              <Button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-full bg-forest px-7 py-3 text-ivory hover:bg-forest-600 sm:w-auto"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </Tabs>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  const errorId = `${htmlFor}-error`;

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <Label
        htmlFor={htmlFor}
        className="text-xs font-medium uppercase tracking-wide text-forest/70"
      >
        {label}
      </Label>

      {children}

      {error ? (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ResultsView({
  tab,
  summary,
  results,
  selectedResult,
  onSelect,
  onEdit,
}: {
  tab: TabId;
  summary: string;
  results: MockResult[];
  selectedResult: MockResult | null;
  onSelect: (result: MockResult | null) => void;
  onEdit: () => void;
}) {
  const title: Record<TabId, string> = {
    visa: 'Visa assistance options',
    flights: 'Available flight options',
    hotels: 'Recommended stays',
    cars: 'Available rental vehicles',
  };

  return (
    <div className="pt-5" aria-live="polite">
      {selectedResult ? (
        <div className="rounded-2xl border border-forest/10 bg-forest/5 p-6 text-center sm:p-9">
          <CheckCircle2
            className="mx-auto h-12 w-12 text-terracotta-600"
            aria-hidden="true"
          />

          <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-terracotta-600">
            Demo selection confirmed
          </p>

          <h3 className="mt-3 font-serif text-2xl text-forest">
            {selectedResult.title}
          </h3>

          <p className="mt-2 text-sm text-forest/70">
            {selectedResult.subtitle}
          </p>

          <p className="mt-4 text-sm text-forest/70">
            Your selection is displayed for assessment purposes only.
            No reservation, payment or booking has been created.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => onSelect(null)}
              className="rounded-full"
            >
              Back to results
            </Button>

            <Button
              type="button"
              onClick={onEdit}
              className="rounded-full bg-forest text-ivory hover:bg-forest-600"
            >
              Edit search
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-5 rounded-xl bg-forest/5 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-forest">
              <CheckCircle2 className="h-5 w-5 text-terracotta-600" />
              {title[tab]}
            </div>

            <p className="mt-2 break-words text-sm text-forest/65">
              {summary}
            </p>

            <p className="mt-2 text-xs text-muted-foreground">
              Illustrative mock results — not live availability or prices.
            </p>
          </div>

          <ul className="divide-y divide-forest/10 overflow-hidden rounded-xl border border-forest/10 bg-card">
            {results.map((result) => (
              <li
                key={result.id}
                className="flex flex-col gap-4 p-4 transition-colors hover:bg-forest/[0.03] sm:flex-row sm:items-center sm:justify-between sm:px-5"
              >
                <div className="min-w-0">
                  <h3 className="font-serif text-lg text-forest">
                    {result.title}
                  </h3>

                  <p className="mt-1 text-sm text-forest/70">
                    {result.subtitle}
                  </p>

                  <p className="mt-1 text-xs text-forest/55">
                    {result.meta}
                  </p>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <span className="font-serif text-xl text-terracotta-600">
                    {result.price}
                  </span>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onSelect(result)}
                    className="rounded-full border-forest/20 text-forest hover:bg-forest hover:text-ivory"
                  >
                    Select option
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={onEdit}
              className="text-forest hover:bg-forest/5"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Edit search
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

