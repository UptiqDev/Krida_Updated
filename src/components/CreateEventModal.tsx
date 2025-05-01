import { Calendar } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface CreateEventModalProps {
    open: boolean;
    onClose: () => void;
}

export default function CreateEventModal({ open, onClose }: CreateEventModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        location: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (!formData.title || !formData.date) {
            toast.error('Please fill in all required fields');
            return;
        }

        // In a real app, this would send data to an API
        console.log('Submitting event:', formData);
        toast.success('Event created successfully!');
        onClose();

        // Reset form
        setFormData({
            title: '',
            date: '',
            location: '',
            description: ''
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogContent className='sm:max-w-[500px]'>
                <DialogHeader>
                    <DialogTitle className='flex items-center gap-2'>
                        <Calendar className='h-5 w-5' />
                        <span>Create New Event</span>
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid gap-2'>
                            <Label htmlFor='title'>Event Title*</Label>
                            <Input
                                id='title'
                                name='title'
                                value={formData.title}
                                onChange={handleChange}
                                placeholder='Enter event title'
                                required
                            />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor='date'>Event Date*</Label>
                            <Input
                                id='date'
                                name='date'
                                type='date'
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor='location'>Location</Label>
                            <Input
                                id='location'
                                name='location'
                                value={formData.location}
                                onChange={handleChange}
                                placeholder='Enter event location'
                            />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor='description'>Description</Label>
                            <Textarea
                                id='description'
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                placeholder='Enter event description'
                                rows={4}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type='button'
                            variant='outline'
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button type='submit'>Create Event</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
