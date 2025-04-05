-- Create providers table
CREATE TABLE IF NOT EXISTS providers (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    category TEXT NOT NULL,
    experience INTEGER NOT NULL,
    description TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    id_proof TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
    total_bookings INTEGER DEFAULT 0,
    total_earnings DECIMAL(12,2) DEFAULT 0,
    UNIQUE(user_id)
);

-- Create provider_services table
CREATE TABLE IF NOT EXISTS provider_services (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    provider_id BIGINT REFERENCES providers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    duration INTEGER NOT NULL CHECK (duration > 0),
    description TEXT NOT NULL,
    is_available BOOLEAN DEFAULT true
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    provider_id BIGINT REFERENCES providers(id) ON DELETE CASCADE,
    service_id BIGINT REFERENCES provider_services(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
    user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
    user_review TEXT
);

-- Create RLS policies
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Providers policies
CREATE POLICY "Allow users to view approved providers"
    ON providers FOR SELECT
    USING (status = 'approved');

CREATE POLICY "Allow users to create their own provider profile"
    ON providers FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow providers to update their own profile"
    ON providers FOR UPDATE
    USING (auth.uid() = user_id);

-- Provider services policies
CREATE POLICY "Allow users to view available services"
    ON provider_services FOR SELECT
    USING (is_available = true);

CREATE POLICY "Allow providers to manage their own services"
    ON provider_services FOR ALL
    USING (EXISTS (
        SELECT 1 FROM providers
        WHERE providers.id = provider_services.provider_id
        AND providers.user_id = auth.uid()
    ));

-- Bookings policies
CREATE POLICY "Allow users to view their own bookings"
    ON bookings FOR SELECT
    USING (auth.uid() = user_id OR EXISTS (
        SELECT 1 FROM providers
        WHERE providers.id = bookings.provider_id
        AND providers.user_id = auth.uid()
    ));

CREATE POLICY "Allow users to create bookings"
    ON bookings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own bookings"
    ON bookings FOR UPDATE
    USING (auth.uid() = user_id OR EXISTS (
        SELECT 1 FROM providers
        WHERE providers.id = bookings.provider_id
        AND providers.user_id = auth.uid()
    ));
