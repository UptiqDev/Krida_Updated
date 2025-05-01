import CreateEventModal from '@/components/CreateEventModal';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';
import { useState } from 'react';

interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
}

// Mock data for demonstration
const mockEvents: Event[] = [
    {
        id: '1',
        title: 'Freshers Welcome',
        date: '2024-05-15',
        location: 'University Auditorium',
        description: 'Welcome event for all new students.'
    },
    {
        id: '2',
        title: 'Alumni Meetup',
        date: '2024-06-10',
        location: 'University Campus',
        description: 'Annual meetup for university alumni.'
    }
];

const Events = () => {
    const [events, setEvents] = useState<Event[]>(mockEvents);
    const [eventModalOpen, setEventModalOpen] = useState(false);

    // Format date for display
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />

            <main className='container mx-auto px-4 py-8'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold'>University Events</h1>
                    <Button
                        onClick={() => setEventModalOpen(true)}
                        className='bg-krida-dark text-white hover:bg-krida-dark/90'
                    >
                        <Plus className='h-4 w-4 mr-2' />
                        Create Event
                    </Button>
                </div>

                {events.length > 0 ? (
                    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                        {events.map(event => (
                            <div
                                key={event.id}
                                className='bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow'
                            >
                                <div className='flex items-center mb-2 text-krida-gold'>
                                    <Calendar className='h-5 w-5 mr-2' />
                                    <span className='font-medium'>{formatDate(event.date)}</span>
                                </div>
                                <h2 className='text-xl font-semibold mb-2'>{event.title}</h2>
                                {event.location && (
                                    <p className='text-gray-600 mb-2'>
                                        <span className='font-medium'>Location:</span> {event.location}
                                    </p>
                                )}
                                {event.description && <p className='text-gray-700 mt-2'>{event.description}</p>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-12 bg-white rounded-lg shadow'>
                        <Calendar className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                        <h3 className='text-xl font-medium text-gray-600 mb-2'>No events found</h3>
                        <p className='text-gray-500 mb-6'>Create your first event to get started</p>
                        <Button
                            onClick={() => setEventModalOpen(true)}
                            className='bg-krida-dark text-white hover:bg-krida-dark/90'
                        >
                            <Plus className='h-4 w-4 mr-2' />
                            Create Event
                        </Button>
                    </div>
                )}
            </main>

            {/* Event Modal */}
            <CreateEventModal
                open={eventModalOpen}
                onClose={() => setEventModalOpen(false)}
            />
        </div>
    );
};

export default Events;
